const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");
const deleteDeadlines = require("../constants/leaveDeleteDeadlines");
const subDays = require("date-fns/subDays");

const User = require("./user");

mongooseConnect(mongoose, process.env.MONGO_URI, "leave");

const statusRangeMsg =
	"Request status must one of the following values: -1 (denied), 0(pending), 1(approved)";
const leaveSchema = new mongoose.Schema({
	dates: {
		start: { type: Date, required: true, min: () => new Date() },
		end: {
			type: Date,
			required: true,
			min: this.start,
		},
	},
	user: {
		type: String,
		required: true,
		validate: {
			validator: () => {
				return User.getFromEmployeeNumber(this.user) ? true : false;
			},
			message: "Provided user ID is invalid",
		},
	},
	status: {
		type: Number,
		required: true,
		min: [-1, statusRangeMsg],
		max: [1, statusRangeMsg],
		get: (i) => Math.round(i),
		set: (i) => Math.round(i),
	},
	submitted: { type: Date, default: Date.now() },
});

leaveSchema.pre("find", async () => {
	console.log("Deleting old leave request items...");
	await Leave.deleteMany({
		status: -1,
		submitted: { $lt: subDays(new Date(), deleteDeadlines.denied) },
	})
		.then((result) => {
			console.log(
				`${result.deletedCount} old denied leave requests were deleted`
			);
		})
		.catch((error) => {
			console.log(
				"There was an error while deleting old denied leave requests: ",
				error
			);
		});

	await Leave.deleteMany({
		"status": 1,
		"dates.end": { $lt: subDays(new Date(), deleteDeadlines.allowed) },
	})
		.then((result) => {
			console.log(
				`${result.deletedCount} old allowed leave requests were deleted`
			);
		})
		.catch((error) => {
			console.log(
				"There was an error while deleting old allowed leave requests: ",
				error
			);
		});
});

const Leave = mongoose.model("leave", leaveSchema);

module.exports = Leave;
