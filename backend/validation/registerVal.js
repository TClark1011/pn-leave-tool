const yup = require("yup");

const emailRegex = require("../utility/regex/email");
const phoneRegex = require("../utility/regex/phone");

module.exports = yup.object({
	employee_number: yup
		.string()
		.required("Employee Number is required")
		.length(6, "Employee Numbers are 6 digits long"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters long")
		.max(24, "Password cannot be longer than 24 characters long"),
	email: yup
		.string()
		.required("Please enter a valid email address")
		.matches(emailRegex, "email address is invalid"),
	phone: yup
		.string()
		.required("Please enter a valid Phone Number")
		.matches(phoneRegex, "Phone Number is invalid"),
});
