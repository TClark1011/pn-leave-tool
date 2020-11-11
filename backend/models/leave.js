const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");

const User = require("./user");

mongooseConnect(mongoose, process.env.MONGO_URI);

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

const Leave = mongoose.model("leave", leaveSchema);

module.exports = Leave;
