const jwt = require("jsonwebtoken");

const User = require("../models/user");

const verifyToken = async (receivedToken, employee_number) => {
	return jwt.verify(receivedToken, process.env.JWT_SECRET) === employee_number;
};

module.exports = verifyToken;
