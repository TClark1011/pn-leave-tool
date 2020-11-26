const express = require("express");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const sanitiseUser = require("../utility/sanitiseUser");
const genericError = require("../utility/genericError");
const authenticateUser = require("../utility/authenticateUser");
const encryptPassword = require("../utility/encryptPassword");
const getToken = require("../utility/getToken");
const verificationEmail = require("../utility/verificationEmail");

const registerVal = require("../../src/validation/registerVal");
const loginVal = require("../../src/validation/loginVal");

const userRouter = express.Router();

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
	try {
		await loginVal.validate(request.body);
	} catch (error) {
		response.status(400).json({ error: error.errors[0] });
		return console.log("yup validation failed: ", error.errors[0]);
	}

	//# Initialise request body parameter variables
	const employee_number = request.body.employee_number;
	const password = request.body.password;

	const foundUser = await User.getFromEmployeeNumber(employee_number); //* Find user with provided id
	if (!foundUser || !(await authenticateUser(foundUser, password))) {
		response
			.status(401)
			.json({ error: "Incorrect Employee Number or Password" });
		return console.log("Error: login attempt failed (bad credentials)");
	} else if (!foundUser.verified) {
		response
			.status(401)
			.json({ error: "You must verify your email before you can login" });
		return console.log("Error: login attempt failed (email not verified)");
	}
	//#If user exists and password matches
	const cleanUser = sanitiseUser(foundUser);
	response.status(200).json({ ...cleanUser, token: getToken(cleanUser) });
	return console.log("User successfully logged in");
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

	//# Validation
	try {
		await registerVal.validate(request.body);
	} catch (error) {
		response.status(400).json({ error: error.errors[0] });
		return console.log("yup validation failed: ", error.errors[0]);
	}

	//# Initialise request body parameter variables
	// const employee_number = request.body.employee_number;
	// const password = request.body.password;

	const { employee_number, password } = request.body;

	//# Check if an account with the provided employee number already exists
	const foundUser = await User.getFromEmployeeNumber(employee_number);

	if (foundUser) {
		//# If there is an existing account...
		if (foundUser.verified) {
			//# if that existing account has been verified
			const errorSummary = `An account with the Employee Number '${employee_number}' already exists.`;
			const errorLongDescription =
				" If you are creator of that account you can enter your password and press 'login'. If you did not create that account, please contact ...";
			response.status(401).json({ error: errorSummary + errorLongDescription });
			return console.log(
				"Error: Account registration failed. An account with the provided employee number already exists"
			);
		}
		const updateFields = ["email", "phone", "leave", "first_name", "last_name"];
		for (let field of updateFields) {
			foundUser[field] = request.body[field];
		}
		foundUser.password = await encryptPassword(request.body.password);
		await foundUser.save();
		response.status(200).send("updated unverified user data");
		return console.log("Updated unverified user data");
	}

	//# There is no pre-existing account
	const userObj = request.body;
	userObj.password = await encryptPassword(password);
	userObj.date = Date.now();

	if (!foundUser) {
		await new User(userObj).save();
	} else {
		userObj.save();
	}

	const cleanUser = sanitiseUser(userObj);

	// response.status(200).json({ ...cleanUser, token: getToken(cleanUser) });
	response.status(200).json({});

	console.log(
		"new user registration details processed, sending verification email"
	);

	verificationEmail(cleanUser)
		.then((result) => {
			console.log("verification email sent");
		})
		.catch((error) => {
			console.log("verification email failed: ", error);
		});
});

userRouter.get("/verify/:token", async (request, response) => {
	//TODO: Check the user's status is pending
	try {
		const decodedToken = jwt.verify(
			request.params.token,
			process.env.JWT_secret
		);
		const foundUser = await User.getFromEmployeeNumber(decodedToken);
		if (!foundUser.verified) {
			foundUser.verified = true;
			foundUser.save();
			response
				.status(200)
				.redirect(`//${process.env.FRONTEND_URL}/login?verified`);
			return console.log("A user has been successfully verified");
		} else {
			response
				.status(405)
				.redirect(`//${process.env.FRONTEND_URL}/login?verified`);
			return console.log(
				"A user activated a verification link but they were already verified"
			);
		}
	} catch (err) {
		console.log("error: ", err);
		return response.status(400).send("Invalid verification link");
	}
});

userRouter.post(
	"/resendVerification/:employee_number",
	async (request, response) => {
		console.log("Received request to resend a verification email");
		const { employee_number } = request.params;
		const foundUser = await User.getFromEmployeeNumber(employee_number);

		if (!foundUser || foundUser.verified) {
			response
				.status(401)
				.error({ error: "Your account has already been verified" });
			return console.log(
				"Received request to resend a verification email but the user's account had already been verified"
			);
		}

		console.log("Processed request to resend verification email, now sending");
		verificationEmail({
			email: foundUser.email,
			employee_number: foundUser.employee_number,
			first_name: foundUser.first_name,
		})
			.then((result) => {
				response.status(200).json();
				return console.log("verification email resent");
			})
			.catch((error) => {
				response.status(401);
				console.log("verification email failed to resend. error: ", error);
			});
	}
);

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
