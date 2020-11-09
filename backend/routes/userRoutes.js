const express = require("express");

const User = require("../models/user");

const userRouter = express.Router();

const validateRequest = require("../utility/validateRequest");
const sanitiseUser = require("../utility/sanitiseUser");
const genericError = require("../utility/genericError");
const authenticateUser = require("../utility/authenticateUser");
const encryptPassword = require("../utility/encryptPassword");

const registerVal = require("../validation/registerVal");

//TODO: Webtoken authentication

//# USER LOGIN
/**
 * Route handling request to login
 * @param {number} employee_number - The PN employee number provided by the user
 * @param {string} password - The password provided by the user
 * @returns {Object} User information, if login failed, return object representing an error
 */
userRouter.post("/login", async (request, response) => {
	console.log("Received request to log in");

	//# Validate request
	const validation = validateRequest(request, {
		expectedFields: ["employee_number", "password"],
	});
	if (!validation.valid) {
		response.status(500).json({ error: genericError("log in") });
		return console.log(`Error: ${validation.reason} - ${validation.details}`);
	}

	//# Initialise request body parameter variables
	const employee_number = request.body.employee_number;
	const password = request.body.password;

	const foundUser = await User.getFromEmployeeNumber(employee_number); //* Find user with provided id
	if (foundUser && (await authenticateUser(foundUser, password))) {
		//#If user exists and password matches
		response.status(200).json(sanitiseUser(foundUser));
		console.log("User successfully logged in");
	} else {
		response
			.status(401)
			.json({ error: "Incorrect Employee Number or Password" });
		console.log("Error: login attempt failed (bad credentials)");
	}
});

//#REGISTER NEW USER
/**
 * Request to register a new user
 * @param {number} employee_number - The PN employee number of the user registering their account
 * @param {string} password - The desired password of the new account
 * @return {Object} The object representing the new user account with 'unsafe' information (eg; password) removed
 */
userRouter.post("/register", async (request, response) => {
	console.log("Received request to register a new user");

	//# Validate Request
	const validation = validateRequest(["employee_number", "password"], request);
	if (!validation.valid) {
		response.status(500).json({ error: genericError("register a new user") });
		return console.log(`Error: ${validation.reason}`);
	}

	//TODO: yup validation

	//# Initialise request body parameter variables
	const employee_number = request.body.employee_number;
	const password = request.body.password;

	try {
		await registerVal.validate(request.body);
	} catch (error) {
		response.status(400).json({ error: error.errors[0] });
		return console.log("yup validation failed: ", error.errors[0]);
	}

	//# Check if an account with the provided employee number already exists
	if (await User.getFromEmployeeNumber(employee_number)) {
		//# If there is an existing account
		const errorSummary = `An account with the Employee Number '${employee_number}' already exists.`;
		const errorLongDescription =
			" If you are creator of that account you can enter your password and press 'login'. If you did not create that account, please contact ...";
		response.status(401).json({ error: errorSummary + errorLongDescription });
		console.log(
			"Error: Account registration failed. An account with the provided employee number already exists"
		);
	} else {
		//# There is no pre-existing account
		const userObj = request.body;
		userObj.password = await encryptPassword(password);
		userObj.date = Date.now();

		await new User(userObj).save().then(() => {
			response.status(200).json(sanitiseUser(userObj));
		});
		console.log("new user registered successfully");
	}
});

//#USER INFO FETCH
/**
 * Retrieve information about a user
 * @param {string} employee_number - The Pacific National Employee Number of the employee to retrieve information about
 * @returns {Object} Information about user with provided Employee Number, if no such user is found an object representing an error is returned
 */
userRouter.get("/:employee_number", async (request, response) => {
	//# User information is requested
	//# Is also used during registration to check if a user with a given employee number already exists

	console.log("Received request to fetch user information");

	const employee_number = request.params.employee_number;

	if (!employee_number) {
		response
			.status(500)
			.json({ error: genericError("retrieve user information") });
		//TODO: Replace with generic error function call
		return console.log(
			`Error: employee_number not provided, user data could not be retrieved`
		);
	}

	const foundUser = await User.getFromEmployeeNumber(employee_number);
	if (foundUser) {
		response.status(200).json({ user: sanitiseUser(foundUser) });
		return console.log("User data successfully fetched");
	} else {
		const error = `No user with the Employee Number ${employee_number} was found`;
		response.status(404).json({ error });
		return console.log("Error: " + error);
	}
});

module.exports = userRouter;
