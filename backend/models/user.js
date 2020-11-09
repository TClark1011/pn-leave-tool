const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");
mongooseConnect(mongoose, process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
	employee_number: {
		type: Number,
		required: true,
		min: [0, "Employee Number cannot be negative"],
	},
	password: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		validate: {
			validator: function () {
				const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(this.email);
			},
			message: "invalid email address",
		},
	},
	phone: { type: Number, required: true },
	//add phone validation
	leave: { type: Number, min: [0, "user leave must be positive"] },
	date_created: { type: Date, default: Date.now() },
});
//TODO: Extra fields
//TODO: Add validation fields to schema keys (general field length, phone number format)

const User = mongoose.model("User", userSchema);

User.getFromEmployeeNumber = async function (employee_number) {
	return await User.findOne({ employee_number });
};

module.exports = User;
