const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");
mongooseConnect(mongoose, process.env.MONGO_URI, "rosterDay");

/**
 * Very basic roster day model
 * @param {Date} date - The date of the roster day
 * @param {number} absentDrivers - The number of drivers expected to be absent on the day
 */
const daySchema = new mongoose.Schema({
	date: { type: Date, required: true },
	absentDrivers: { type: Number, default: 0 },
	depot: { type: mongoose.Schema.Types.ObjectId, ref: "depot", required: true },
});
//TODO: Need to store the (accurate) average number of available drivers

daySchema.pre("save", function () {
	this.date.setHours(0, 0, 0, 0);
});

const RosterDay = mongoose.model("roster_day", daySchema);

/**
 * Add an absent driver to the date record for passed date. if no record exists, creates and saves one with a single absent driver
 * @param {Date} date - The date to add an absent driver too
 */
RosterDay.addAbsentDriver = async function (date) {
	const dateCopy = new Date(date);
	const lower = new Date(dateCopy.setHours(0, 0, 0, 0));
	const upper = new Date(dateCopy.setHours(23, 59, 59, 59));
	const updateTarget = await RosterDay.findOneAndUpdate(
		{
			date: {
				$gte: lower,
				$lte: upper,
			},
		},
		{ $inc: { absentDrivers: 1 } }
	);
	if (!updateTarget) {
		new RosterDay({ date: date, absentDrivers: 1 }).save();
	}
};

/**
 * Get the date record for provided date
 * @param {Date} date - the date to retrieve the record for
 * @returns {RosterDay} - The record for the provided date, if no record exists, returns a blank record for that date
 */
RosterDay.getDateRecord = async function (date, depot) {
	const dateCopy = new Date(date);
	const lower = new Date(dateCopy.setHours(0, 0, 0, 0));
	const upper = new Date(dateCopy.setHours(23, 59, 59, 59));
	const record = await RosterDay.findOne({
		date: {
			$gte: lower,
			$lte: upper,
		},
		depot,
	});
	if (!record) {
		return new RosterDay({ date: date, absentDrivers: 0, depot });
	}
	return record;
};

module.exports = RosterDay;
