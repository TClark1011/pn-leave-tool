//# This file routes requests made to the paths found at '/api/...'field
//# Such requests are made by the user's browser to fetch data

const leaveParameters = {
	defaultDrivers: 30,
	minimumDrivers: 20,
};
//FIXME: THIS IS TEMPORARY DATA TO BE USED AS THE PARAMETERS FOR APPROVING/DENYING LEAVE REQUEST, IN THE FUTURE THIS INFORMATION WILL BE STORED IN A DEPOT'S ENTRY IN THE DATABASE

//TODO: Refactor into seperate route files eg; users, leave, etc.
//TODO: Backend field authentication

const express = require("express");
const bcrypt = require("bcrypt");

const RosterDay = require("../models/rosterDay");

const apiRouter = express.Router();
/**
 * @param  { string } action => The action that was trying to be performed
 */
function genericError(action) {
	//# Generate a generic error message
	return `An error occurred while attempting to ${action}. Please restart the application or try again later.`;
}

function getFrontendUser(user) {
	//# Remove data that is unsafe for frontend
	const frontendUser = JSON.parse(JSON.stringify(user)); //# Create a shallow copy to allow field deletion
	delete frontendUser.password;
	delete frontendUser.__v;
	delete frontendUser._id;
	return frontendUser;
}

async function encryptPassword(password) {
	//# Returns encrypted version of 'password'
	return await bcrypt.hash(password, 10);
}
//TODO: Webtoken authentication

/**
 * Processes a request for annual leave and returns approval status
 * @param  {Object} dates - Object with start/end dates of requested annual leave
 * @param  {Object} user - Information about user who requested leave
 * @returns {number} 1 if approved, 0 if undetermined, -1 if denied
 */
async function processLeaveRequest(dates, user) {
	const storedUpdates = [];
	for (
		let date = new Date(dates.start);
		date <= new Date(dates.end);
		date = new Date(date.setDate(date.getDate() + 1))
	) {
		const storedDay = await RosterDay.getDateRecord(date);
		if (dayCheck(storedDay)) {
			const newDay = storedDay;
			newDay.absentDrivers += 1;
			storedUpdates.push(new RosterDay(newDay));
		} else {
			return -1;
		}
	}

	for (let i of storedUpdates) {
		i.save();
	}

	function dayCheck(dateRecord) {
		//TODO: Check if it is alright for the driver to be absent on this day
		return true;
	}

	//TODO: Process leave request and return approval status
	return 1;
}

//# LEAVE DATA

/**
 * Route handling request to fetch information about submitted leave requests
 * @param {Object} user - The user requesting the information, affects what information is returned
 * @param {...} user[...] - Describe user fields
 * @return {Object[]} List of annual leave requests
 */
apiRouter.get("/api/leave", (request, response) => {
	//# Fetch leave
	console.log("Received request to fetch 'leave' items");
	response.status(200).json({ leave: "this will be data one day" });
});

/**
 * Route handling user submission of annual leave request
 * @param {Object} user - The user who submitted the request
 * @param {Object} leaveReq - Information about the leave request
 * @param {Object} leaveReq.dates - The date range that the requested leave spans
 * @param {Date} leaveReq.dates.start - The date that the requested leave starts on
 * @param {Date} leaveReq.dates.end - The date that the requested leave ends on
 * ...
 * @returns {Object} Status of submitted leave request
 */
apiRouter.post("/api/leave", async (request, response) => {
	//# Submit a leave request
	console.log("Received request to submit a request for annual leave");
	const leaveReq = request.body.request;
	const user = request.body.user;

	const status = await processLeaveRequest(leaveReq.dates, user);

	switch (status) {
		case 1:
			response.status(200).json({ status: "The request has been approved" }); //user message
			console.log("leave request was approved");
			break;
		default:
			response.status(500).json({ status: "Request has defaulted" });
	}
});

module.exports = apiRouter;
