const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");
require("./depot");
const phoneRegex = require("../utility/regex/phone");
const emailRegex = require("../utility/regex/email");
mongooseConnect(mongoose, process.env.MONGO_URI, "user");

const enLengthMessage = "employee_number must be 6 characters long";
//? employee_number length message
const userSchema = new mongoose.Schema({
	employee_number: {
		type: String, //?String so as to support 0 starting numbers
		required: true,
		maxlength: [6, enLengthMessage],
		minlength: [6, enLengthMessage],
	},
	password: { type: String, required: true, minLength: 6, maxLength: 24 },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	depot: { type: mongoose.Schema.Types.ObjectId, ref: "depot", required: true },
	email: {
		type: String,
		required: true,
		validate: {
			validator: function () {
				//? Has to be function and not lambda due to use of 'this'
				return emailRegex.test(this.email);
			},
			message: "invalid email address",
		},
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: function () {
				return phoneRegex.test(this.phone);
			},
			message: "phone number invalid",
		},
	},
	date_created: { type: Date, default: Date.now() },
	verified: { type: Boolean, default: false },
});

const autoPopulateDepot = function () {
	this.populate("depot", "name");
};

// userSchema.pre("find", autoPopulateDepot).pre("findOne", autoPopulateDepot);

const User = mongoose.model("User", userSchema);

User.getFromEmployeeNumber = async function (employee_number) {
	return await User.findOne({ employee_number }).populate("depot", "name");
};

module.exports = User;
