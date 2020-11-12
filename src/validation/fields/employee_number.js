const yup = require("yup");

module.exports = yup
	.string()
	.required("Employee Number is required")
	.length(6, "Employee Numbers are 6 digits long");
