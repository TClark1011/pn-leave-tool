const yup = require("yup");

const loginSchema = require("./schemas/loginSchema");

module.exports = yup.object({
	employee_number: loginSchema.employee_number.required(),
	password: loginSchema.password.required(),
});
