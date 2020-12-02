const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = require("../utility/verifyToken.js");

const authRouter = express.Router();

authRouter.all("/*", async (request, response, next) => {
	const authHeader = request.headers["authorisation"];
	const token = authHeader;

	if (
		request.headers["operator_access_key"] &&
		request.headers["operator_access_key"] === process.env.OPERATOR_ACCESS_KEY
	) {
		console.log(request.originalUrl);
		next();
		return console.log("Allowed access to operator");
	}
	if (!token) {
		console.log(
			"A request was denied due to a lack of an authentication token"
		);
		return response
			.status(401)
			.json({ error: "no authentication token.", redirect: "/login?redir" });
	} else if (
		!(await verifyToken(
			token,
			request.body.employee_number || request.body.user || request.query.user
		))
	) {
		console.log(
			"A request was denied due to a present but INCORRECT authentication token. This could indicate an intentional attempted attack."
		);
		return response
			.status(401)
			.json({ error: "bad authentication token.", redirect: "/login?redir" });
	}
	jwt.verify(token, process.env.JWT_SECRET, (error) => {
		if (error) {
			console.log(
				"A request was denied due to an invalid authentication token"
			);
			return response.status(401).json({
				error: "invalid authentication token.",
				redirect: "/login?redir",
			});
		}
		next();
	});
});

module.exports = authRouter;
