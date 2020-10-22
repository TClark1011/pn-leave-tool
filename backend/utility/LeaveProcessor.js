const RosterDay = require("../models/rosterDay");

async function processLeaveRequest(dates, user) {
	const storedUpdates = [];
	for (
		let date = new Date(dates.start);
		date <= new Date(dates.end);
		date = new Date(date.setDate(date.getDate() + 1))
	) {
		const storedDay = await RosterDay.getDateRecord(date);
		if (dayCheck(storedDay)) {
			const newDay = storedDay;
			newDay.absentDrivers += 1;
			storedUpdates.push(new RosterDay(newDay));
		} else {
			return -1;
		}
	}

	function dayCheck() {
		//TODO: Check if a day has enough drivers to continue operation with the requesting driver absent
	}

	return 1;
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

module.exports = LeaveProcessor;
