const RosterDay = require("../models/rosterDay");
const User = require("../models/user");
const differenceInDays = require("date-fns/differenceInDays");
const { requiredWorkforce } = require("../constants/systemParameters");

async function newLeaveProcessor(dates, user, depotId) {
	const result = new LeaveProcessor(dates, user);
	await result.init(depotId);
	return result;
}

/**
 * @class
 * @classdesc Stores and processes information about a request for annual leave
 * @property {RosterDay[]} storedUpdates - An array of date records with their 'absentDrivers' field already incremented. Records are saved if annual leave request is found to be valid
 */
class LeaveProcessor {
	constructor(dates, user) {
		this.storedUpdates = [];
		this.dates = dates;
		this.user = user;
	}

	/**
	 * Initialise 'stored' updates field with date records
	 */
	init = async function (depotId = this.user.depot._id) {
		for (
			let date = new Date(this.dates.start);
			date <= new Date(this.dates.end);
			date = new Date(date.setDate(date.getDate() + 1))
		) {
			const storedDay = await RosterDay.getDateRecord(date, depotId);
			const newDay = storedDay;
			newDay.absentDrivers += 1;
			this.storedUpdates.push(new RosterDay(newDay));
		}
	};

	/**
	 * Evaluate the validity of the request for annual leave
	 * @param {Object} sampleLeaveData - Annual leave evaluation parameters
	 * @param {Number} sampleLeaveData.minimumDrivers - Minimum number of drivers required to operate
	 * @param {Number} sampleLeaveData.averageDrivers - The number of drivers we assume are rostered
	 * @returns {Object} - Information about validity of the request for annual leave
	 */
	evaluate = function (depotData) {
		const invalidDays = [];
		for (let item of this.storedUpdates) {
			const rosteredDrivers = depotData.drivers - item.absentDrivers;
			if (rosteredDrivers / depotData.drivers < requiredWorkforce) {
				invalidDays.push(item.date);
			}
		}
		this.approved = invalidDays.length === 0;
		return {
			approved: this.approved,
			invalidDays,
		};
	};

	/**
	 * Save new 'Leave' record and update rosterDay records if request was approved
	 * @param {Object} Leave - The mongodb model for leave requests
	 */
	commit = async function (Leave, depotId = this.user.depot._id) {
		await new Leave({
			dates: this.dates,
			user: this.user.employee_number,
			status: this.approved ? 1 : -1,
			depot: depotId,
		}).save();
		if (this.approved) {
			for (let item of this.storedUpdates) {
				await item.save();
			}
			const userRecord = await User.getFromEmployeeNumber(
				this.user.employee_number
			);
			userRecord.leave -= differenceInDays(
				new Date(this.dates.end),
				new Date(this.dates.start)
			);
			await userRecord.save();
		}
	};
}

module.exports = newLeaveProcessor;
