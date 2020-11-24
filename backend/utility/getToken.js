const jwt = require("jsonwebtoken");

module.exports = (user) =>
	jwt.sign(user.employee_number || user, process.env.JWT_SECRET);
