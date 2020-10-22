const express = require("express");
const leaveRouter = express.Router();

const LeaveProcessor = require("../utility/LeaveProcessor");

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

	const leaveRequest = new LeaveProcessor(
		request.body.dates,
		request.body.user
	);
	await leaveRequest.init();
	await leaveRequest.commit();
	response.status(200).json({ status: "Request for annual leave approved" });
	console.log("Leave request approved");
});

module.exports = leaveRouter;
