//# This file routes requests made to the paths found at '/api/...'field
//# Such requests are made by the user's browser to fetch data

const express = require("express");
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const apiRouter = express.Router();

function getFrontendUser(user) {
    //# Remove data that is unsafe for frontend
    const frontendUser = JSON.parse(JSON.stringify(user));
    delete frontendUser.password;
    delete frontendUser.__v
    delete frontendUser._id
	return frontendUser;
}

async function encryptPassword(password) {
    //# Returns encrypted version of 'password'
    return await bcrypt.hash(password, 10);
}

async function authenticateUser(user, receivedPassword) {
    //# Returns true/false depending on if 'receivedPassword' matches the user's encrypted password
    return await bcrypt.compare(receivedPassword, user.password) ? true : false;
}

async function findUser(employee_number) {
    //# Find a user object with given 'employee_number', return null if one is not found
    var foundUser;
    await User.findOne({employee_number}).then(result => foundUser = result || null)
    return foundUser;
}

//TODO: Function for checking required fields are present in a request (takes an array of strings of fields and a request object)

//TODO: Webtoken authentication

//# LEAVE DATA
apiRouter.get("/api/leave", (request, response) => {
	//# Fetch leave
	console.log("Received request to fetch 'leave' items");
	response.status(200).json({ leave: "this will be data one day" });
});

//# USER LOGIN
apiRouter.post("/api/login", async (request, response) => {
    //# User tries to log in
    //@param    {string} employee_number => The PN employee number of the user trying to log in
    //@param    {string} password        => The unencrypted password sent by the user
    //@response {object} user            => The object with user data
    console.log("Received a request to log in");

    //TODO: Validate passed data (contains required fields)
    if(!("employee_number" in request.body)) {
        return console.log("field 'employee_number' missing from login request");
    }
    
    const foundUser = await findUser(request.body.employee_number); //* Search database for user object with matching 'employee_number'
    const passwordCheck = await authenticateUser(foundUser, request.body.password); //* If the given password matches the user's stored password
    if(foundUser && passwordCheck) { //# If a user was found and the passwords match
        response.status(200).json(getFrontendUser(foundUser));
        console.log("user successfully logged in");
    } else { //# if a user was not found or the given password was incorrect
        response.status(401).json({error:"Incorrect Employee Number or Password. Please re-enter your details, register your account if you haven't already or reset your password if you have forgotten it."});
        console.log("Login attempt failed");
    }
});

//# USER REGISTRATION
apiRouter.post("/api/registerUser", async (request, response) => {
    //# Request to register a new user
    //* Expected request body data fields:
    //@param    {string} employee_number => The PN employee number of the user registering their account
    //@param    {string} password        => The desired password of the new account
    //@response {object} newUser         => The object representing the new user account with 'unsafe' information (eg; password) removed
	console.log("Received request to register a new user");
	//TODO: Validate passed data (contains required fields)
    const employee_number = request.body.employee_number;
    const password = request.body.password;


	const userExists = await findUser(employee_number)
		? true
        : false; //* userExists => if a user account with the passed 'employee_number' exists already
        
	if (!userExists) { //# There is no pre-existing account with the passed 'employee_number'
		const userObj = {
			employee_number: employee_number,
			password: await encryptPassword(password),
			date: Date.now(),
		};

		const newUser = new User(userObj);
		newUser.save().then((result) => {
			console.log("new user data saved");
			response.status(200).json(getFrontendUser(userObj));
		});
	} else { //# A user account with the passed 'employee_number' already exists
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
