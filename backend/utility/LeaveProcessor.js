const RosterDay = require("../models/rosterDay");

async function newLeaveProcessor(dates, user) {
	const result = new LeaveProcessor(dates, user);
	await result.init();
	return result;
}

class LeaveProcessor {
	constructor(dates, user) {
		this.storedUpdates = [];
		this.dates = dates;
		this.user = user;
	}

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

	commit = async function () {
		for (let item of this.storedUpdates) {
			await item.save();
		}
	};
}

// module.exports = LeaveProcessor;
module.exports = newLeaveProcessor;
