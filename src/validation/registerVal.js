const yup = require("yup");

const loginSchema = require("./schemas/loginSchema");
const passwordField = require("./fields/password");

const emailRegex = require("./regex/email");
const phoneRegex = require("./regex/phone");

module.exports = yup.object({
	employee_number: loginSchema.employee_number.required(
		"Employee Number is a required field"
	),
	confirm_employee_number: loginSchema.employee_number
		.required("You must confirm your Employee Number")
		.test(
			"Employee Numbers match",
			"Employee Numbers do not match",
			function (value) {
				return value
					? value === this.resolve(yup.ref("employee_number"))
					: true;
			}
		),
	password: loginSchema.password.required("Password is a required field"),
	confirm_password: passwordField
		.required()
		.test("Passwords match", "Passwords do not match", function (value) {
			return value ? value === this.resolve(yup.ref("password")) : true;
		}),
	first_name: yup.string().required("Please enter your first name"),
	last_name: yup.string().required("Please enter your last name"),
	depot: yup.string().required("You must select your depot"),
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
