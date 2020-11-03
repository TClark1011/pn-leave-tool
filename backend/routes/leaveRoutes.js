const express = require("express");
const leaveRouter = express.Router();

const RosterDay = require("../models/rosterDay");
const Leave = require("../models/leave");
const User = require("../models/user");

const newLeaveProcessor = require("../utility/LeaveProcessor");
const validateRequest = require("../utility/validateRequest");
const genericError = require("../utility/genericError");

const startOfMonth = require("date-fns/startOfMonth");
const endOfMonth = require("date-fns/startOfMonth");
const addDays = require("date-fns/addDays");
const parse = require("date-fns/parse");
const startOfDay = require("date-fns/startOfDay");

const sampleLeaveData = {
	minimumDrivers: 25,
	averageDrivers: 35,
};

//# ANNUAL LEAVE REQUEST SUBMISSION
/**
 * Route handling user submission of annual leave request
 * @param {Object} user - The user who submitted the request
 * @param {Object} dates - The date range that the requested leave spans
 * @param {Date} dates.start - The date that the requested leave starts on
 * @param {Date} dates.end - The date that the requested leave ends on
 * ...
 * @returns {Object} Status of submitted leave request
 */
leaveRouter.post("/request", async (request, response) => {
	console.log("Received request for annual leave");

	//TODO: Request validator

	const dates = request.body.dates;
	const user = request.body.user;

	const leaveRequest = await newLeaveProcessor(dates, user);

	const evaluation = await leaveRequest.evaluate(sampleLeaveData);

	await leaveRequest.commit(Leave);

	if (evaluation.approved) {
		response.status(200).json({
			approved: true,
			message: "Request for annual leave approved",
		});
		console.log("Leave request approved");
	} else {
		response.status(550).json({
			approved: false,
			message: `Request for annual leave denied due to the following dates being unavailable: ${evaluation.invalidDays}`,
			invalidDays: evaluation.invalidDays,
		});
		console.log(
			`Request for annual leave denied due to the following dates being unavailable: ${evaluation.invalidDays}`
		);
	}
});

/**
 * Randomly generate leave data for dev testing
 * @param {string} key - A key to authenticate the sender of the request has the correct authorisation
 */
leaveRouter.post("/randomgen", async (request, response) => {
	console.log("Received post request to randomise leave data");

	const validation = validateRequest(request, {
		expectedFields: ["key"],
	});
	if (!validation.valid) {
		response
			.status(500)
			.json({ error: genericError("randomise leave request data") });
		return console.log(`Error: ${validation.reason} - ${validation.details}`);
	}

	if (request.body.key === process.env.ADMIN_FUNC_KEY) {
		const start =
			parse(request.body.start, "dd/MM/yyyy", startOfDay(new Date())) ||
			startOfMonth(new Date());
		const end =
			parse(request.body.end, "dd/MM/yyyy", startOfDay(new Date())) ||
			endOfMonth(new Date());
		console.log("Beginning Randomisation...");
		for (let i = start; i <= end; i = addDays(i, 1)) {
			console.log("Randomising: ", i);
			const record = await RosterDay.getDateRecord(i);
			record.absentDrivers = Math.floor(Math.random() * 10) + 1;
			await record.save();
		}

		response.status(200).json({ status: "fine" });
		console.log("Request to randomise leave data was processed successfully");
	} else {
		response.status(401).json({ status: "error: authentication failed" });
		console.log(
			"There was an authentication error in the request to generate leave data"
		);
	}
});

/**
 * Get list of user's submitted leave requests
 * @param {Object} user - Information about the user requesting to see their leave
 */
leaveRouter.get("/:employee_number", async (request, response) => {
	console.log("Received get request for user to view their own leave requests");

	//TODO: Request field validation
	const employee_number = request.params.employee_number;

	const storedUser = await User.getFromEmployeeNumber(employee_number);
	if (storedUser) {
		//# if a user record with the provided 'employee_number' exists
		const result = await Leave.find({ user: employee_number });
		response.status(200).json({ leaveItems: result });
		console.log("Leave requests successfully returned");
		//TODO: JWT Authentication
	} else {
		response.status(401).send("Invalid user");
		console.log(
			"Error: Could not return leave requests to due to invalid provided credentials"
		);
	}
});

leaveRouter.get("/*", (request, response) => {
	response.status(400).send("no service implemented at that address");
});

module.exports = leaveRouter;
