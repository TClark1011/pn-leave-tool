const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = require("../utility/verifyToken.js");

const authRouter = express.Router();

authRouter.all("/*", async (request, response, next) => {
	const authHeader = request.headers["authorisation"];
	const token = authHeader;

	if ("operator_access_key" in request.headers) {
		//# Received a request with an 'operator_access_key' header
		if (
			request.headers["operator_access_key"] === process.env.OPERATOR_ACCESS_KEY
		) {
			//# Provided 'operator_access_key' is correct
			next();
			return console.log("Allowed access to operator");
		}

		//# Provided 'operator_access_key' is incorrect
		response.status(401).json({
			error: "Invalid Access Key",
			message: "The Access Key is incorrect",
		});
		return console.log(
			"Authentication via operator access key was denied due to invalid key"
		);
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
