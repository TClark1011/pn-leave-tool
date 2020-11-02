const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");
mongooseConnect(mongoose, process.env.MONGO_URI);

const statusRangeMsg =
	"Request status must one of the following values: -1 (denied), 0(pending), 1(approved)";
const leaveSchema = new mongoose.Schema({
	dates: {
		start: { type: Date, required: true },
		end: { type: Date, required: true },
	},
	user: { type: Number, required: true },
	status: {
		type: Number,
		required: true,
		min: [-1, statusRangeMsg],
		max: [1, statusRangeMsg],
		get: (v) => Math.round(v),
		set: (v) => Math.round(v),
	},
	submitted: { type: Date, default: Date.now() },
});
//TODO: use 'ref' in user field

//TODO: Use mongoose 'getter' to substitute user id with the user details needed to show leave info

const Leave = mongoose.model("leave", leaveSchema);

module.exports = Leave;
