const yup = require("yup");

const emailRegex = require("../utility/regex/email");
const phoneRegex = require("../utility/regex/phone");

const employee_number = require("./fields/employee_number");

module.exports = yup.object({
	employee_number,
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters long")
		.max(24, "Password cannot be longer than 24 characters long"),
	first_name: yup.string().required("Please enter your first name"),
	last_name: yup.string().required("Please enter your last name"),
	email: yup
		.string()
		.required("Please enter a valid email address")
		.matches(emailRegex, "email address is invalid"),
	phone: yup
		.string()
		.required("Please enter a valid Phone Number")
		.matches(phoneRegex, "Phone Number is invalid"),
	leave: yup.number().required().min(0, "Amount of leave must be positive"),
});
