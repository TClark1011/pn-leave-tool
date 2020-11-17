const yup = require("yup");

const loginSchema = require("./schemas/loginSchema");

module.exports = yup.object({
	employee_number: loginSchema.employee_number.required(
		"Employee Number is a required field"
	),
	password: loginSchema.password.required("Password is a required field"),
});
