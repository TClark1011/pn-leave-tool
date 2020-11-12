const yup = require("yup");

module.exports = yup
	.string()
	.min(6, "Password must be at least 6 characters long")
	.max(24, "Password cannot be longer than 24 characters long");
