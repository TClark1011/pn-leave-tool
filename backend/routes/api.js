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
	//TODO: User log in
});

//# USER REGISTRATION
apiRouter.post("/api/registerUser", async (request, response) => {
	//# Register user
	console.log("Received request to register a new user");
    const employee_number = request.body.employee_number;
    const password = request.body.password;

	//TODO: Validate passed data (contains required fields)

	const userExists = (await User.findOne({
		employee_number: employee_number,
	}))
		? true
        : false; //* Check if user with passed 'employee_number'
        
	if (!userExists) {
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
	} else {
        const error = `An account with the Employee Number '${employee_number}' already exists`;
        response.status(401).json({error})
        console.log(error);
    }
});

apiRouter.get("/api/*", (request, response) => {
	//# Catch all
	response.status(404).json({ error: "invalid api call (bad address)" });
});

module.exports = apiRouter;
