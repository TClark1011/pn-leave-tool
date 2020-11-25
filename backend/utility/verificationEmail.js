require("dotenv").config();

const nodemailer = require("nodemailer");
const jwt = require("jsonWebToken");
const fs = require("fs");

const streamReplace = require("stream-replace");

const sendMail = async ({ employee_number, email, ...user }) => {
	// const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		name: "example.com",
		service: "Gmail",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASS,
		},
	});

	const token = jwt.sign(employee_number, process.env.JWT_SECRET);
	console.log("token ", token);

	const msgFields = {
		...user,
		link: `http://${process.env.BACKEND_URL}/api/users/verify/${token}`,
	};

	var htmlStream = fs.createReadStream("backend/html/verificationEmail.html");

	for (let i = 0; i < Object.keys(msgFields).length; i++) {
		console.log(
			`iterating through user: index: ${i}, key: ${
				Object.keys(msgFields)[i]
			}, value: ${Object.values(msgFields)[i]}`
		);
		const regex = new RegExp("{{" + Object.keys(msgFields)[i] + "}}", "g");
		console.log(
			"value (just before replacing in stream): ",
			Object.values(msgFields)[i]
		);
		htmlStream = htmlStream.pipe(
			streamReplace(regex, Object.values(msgFields)[i])
		);
	}

	return transporter.sendMail({
		from: `"PN Annual Leave" <${process.env.EMAIL_ADDRESS}>`,
		to: email,
		subject: "Account Verification",
		html: htmlStream,
	});
};

module.exports = sendMail;
