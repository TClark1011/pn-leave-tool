const addDays = require("date-fns/addDays");
const addWeeks = require("date-fns/addWeeks");
const addYears = require("date-fns/addYears");
const startOfToday = require("date-fns/startOfToday");

const randomInt = require("random-int");

/**
 * Generate an object with random dates to use for annual leave submission
 * @param {boolean} [swap=false] - Whether or not to swap the start and end dates
 */
module.exports = (swap) => {
	swap = swap || false;
	const start = addWeeks(
		addYears(addDays(startOfToday(), randomInt(0, 6)), randomInt(2, 10)),
		randomInt(3, 5)
	);
	const end = addWeeks(addDays(start, randomInt(0, 6)), randomInt(0, 4));
	return {
		start: swap ? end : start,
		end: swap ? start : end,
	};
};
