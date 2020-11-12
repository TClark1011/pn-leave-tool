const employee_number = require("../fields/employee_number");
const password = require("../fields/password");

module.exports = {
	employee_number: employee_number.required("Employee Number is required"),
	password: password.required("Password is required"),
};
