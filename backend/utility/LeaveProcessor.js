const RosterDay = require("../models/rosterDay");
const User = require("../models/user");
const differenceInDays = require("date-fns/differenceInDays");

async function newLeaveProcessor(dates, user) {
	const result = new LeaveProcessor(dates, user);
	await result.init();
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
	init = async function () {
		for (
			let date = new Date(this.dates.start);
			date <= new Date(this.dates.end);
			date = new Date(date.setDate(date.getDate() + 1))
		) {
			const storedDay = await RosterDay.getDateRecord(date);
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
	evaluate = function (sampleLeaveData) {
		const invalidDays = [];
		for (let item of this.storedUpdates) {
			const rosteredDrivers =
				sampleLeaveData.averageDrivers - item.absentDrivers;
			if (rosteredDrivers < sampleLeaveData.minimumDrivers) {
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
	commit = async function (Leave) {
		await new Leave({
			dates: this.dates,
			user: this.user.employee_number,
			status: this.approved ? 1 : -1,
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
