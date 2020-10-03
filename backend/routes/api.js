//# This file routes requests made to the paths found at '/api/...'field
//# Such requests are made by the user's browser to fetch data

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const apiRouter = express.Router();

function getFrontEndUser(user) {
	//# Remove data that is unsafe for frontend
	delete user.password;
	return user;
}

//TODO: Webtoken authentication

//# LEAVE
apiRouter.get("/api/leave", (request, response) => {
	//# Fetch leave
	console.log("Received request to fetch 'leave' items");
	response.status(200).json({ leave: "this will be data one day" });
});

//# LOGIN
apiRouter.post("/api/login", async (request, response) => {
    //# User tries to log in
	//TODO: User log in
});

//# USER REGISTRATION
apiRouter.post("/api/registerUser", async (request, response) => {
    //# Request to register a new user
    //* Expected request body data fields:
    //@param  {string} employee_number => The PN employee number of the user registering their account
    //@param  {string} password        => The desired password of the new account
    //@return {object} newUser         => The object representing the new user account with 'unsafe' information (eg; password) removed
	console.log("Received request to register a new user");
	//TODO: Validate passed data (contains required fields)
    const employee_number = request.body.employee_number;
    const password = request.body.password;


	const userExists = (await User.findOne({
		employee_number: employee_number,
	}))
		? true
        : false; //* userExists => if a user account with the passed 'employee_number' exists already
        
	if (!userExists) { //# There is no pre-existing account with the passed 'employee_number'
		const userObj = {
			employee_number: employee_number,
			password: await bcrypt.hash(password, 10),
			date: Date.now(),
		};

		const newUser = new User(userObj);
		newUser.save().then((result) => {
			console.log("new user data saved");
			response.status(200).json(getFrontEndUser(userObj));
		});
	} else { //# A user account with the passed 'employee_number'
        const error = `An account with the Employee Number '${employee_number}' already exists.`;
        response.status(401).json({error:error + " If you are creator of that account you can enter your password and press 'login'. If you did not create that account, please contact ..."})
        //TODO: Fill in who to contact
        console.log(error);
    }
});

apiRouter.get("/api/*", (request, response) => {
    //# Catch all if a request is not handled by any other route
    //# It is important for this to come last so that it only catches requests that are not handled by any other route.
	response.status(404).json({ error: "invalid api call (bad address)" });
});

module.exports = apiRouter;
