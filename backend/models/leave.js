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
//TODO: Add validation fields to schema keys
//TODO: use either pre-save method or validator field to check if user id refers to a valid user

const Leave = mongoose.model("leave", leaveSchema);

module.exports = Leave;
