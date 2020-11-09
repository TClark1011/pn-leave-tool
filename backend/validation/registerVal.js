const yup = require("yup");

const emailRegex = require("../utility/regex/email");
const phoneRegex = require("../utility/regex/phone");

module.exports = yup.object({
	employee_number: yup.number().required(),
	password: yup.string().required().min(6).max(24),
	email: yup
		.string()
		.required()
		.matches(emailRegex, "email address is invalid"),
	phone: yup.string().required().matches(phoneRegex, "phone number is invalid"),
});
