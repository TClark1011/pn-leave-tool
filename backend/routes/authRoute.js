const express = require("express");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.all("/*", (request, response, next) => {
	const authHeader = request.headers["authorisation"];
	const token = authHeader;
	if (!token) {
		console.log(
			"A request was denied due to a lack of an authentication token"
		);
		return response.status(401).json({ error: "no authentication token." });
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return response
				.status(401)
				.json({ error: "invalid authentication token." });
		}
		next();
	});
});

module.exports = authRouter;
