const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const url = process.env.MONGO_URI;
console.log(`connecting to ${url}`);
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting too MongoDB: ", error.message);
	});

/**
 * Very basic roster day model
 * @param {Date} date - The date of the roster day
 * @param {number} absentDrivers - The number of drivers expected to be absent on the day
 */
const daySchema = new mongoose.Schema({
	date: { type: Date, required: true },
	absentDrivers: { type: Number, default: 0 },
});
//TODO: Extra fields
//TODO: Need to store the average number of available drivers

daySchema.pre("save", function () {
	this.date.setHours(0, 0, 0, 0);
});

const RosterDay = mongoose.model("roster_day", daySchema);

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

RosterDay.getDateRecord = async function (date) {
	const dateCopy = new Date(date);
	const lower = new Date(dateCopy.setHours(0, 0, 0, 0));
	const upper = new Date(dateCopy.setHours(23, 59, 59, 59));
	const record = await RosterDay.findOne({
		date: {
			$gte: lower,
			$lte: upper,
		},
	});
	if (!record) {
		return new RosterDay({ date: date, absentDrivers: 0 });
	}
	return record;
};

module.exports = RosterDay;