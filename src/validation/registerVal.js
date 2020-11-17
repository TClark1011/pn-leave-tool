const yup = require("yup");

const loginSchema = require("./schemas/loginSchema");
const passwordField = require("./fields/password");

const emailRegex = require("./regex/email");
const phoneRegex = require("./regex/phone");

module.exports = yup.object({
	employee_number: loginSchema.employee_number.required(
		"Employee Number is a required field"
	),
	password: loginSchema.password.required("Password is a required field"),
	confirm_password: passwordField
		.required()
		.test("Passwords match", "Passwords do not match", function (value) {
			return value ? value === this.resolve(yup.ref("password")) : true;
		}),
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
