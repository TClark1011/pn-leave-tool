import { Box, Button, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { resendVerification } from "../../services/auth";
import BodyText from "../utility/BodyText";
import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

function RegistrationConfirmation({ employee_number, ...props }) {
	const [resentEmail, setResentEmail] = useState(false);
	const [response, setResponse] = useState({});

	function resendEmail() {
		setResponse({});
		setResentEmail("loading");
		resendVerification(employee_number)
			.then(() => {
				setResentEmail(true);
			})
			.catch((error) => {
				setResentEmail(false);
				setResponse(error.response.data);
			});
	}
	return (
		<Box>
			<SectionTitle>Verify your email</SectionTitle>
			<StatusMessage tone={response.tone}>{response.message}</StatusMessage>
			<BodyText>
				Thank you for registering. We have sent an email containing a
				verification link to your provided email address.
			</BodyText>
			<div className="action-buttons-wrapper">
				<ActionButton
					onClick={() => {
						window.location = "/login";
					}}
				>
					return to login
				</ActionButton>
				<ActionButton onClick={resendEmail}>Resend Email</ActionButton>
			</div>
			<div className="resend-msg">
				{resentEmail === true && (
					<BodyText>We have sent you another email</BodyText>
				)}
				{resentEmail === "loading" && (
					<LinearProgress color="primary" className="resend-loading" />
				)}
			</div>
		</Box>
	);
}

const ActionButton = ({ children, ...props }) => (
	<Button variant="outlined" {...props}>
		{children}
	</Button>
);

export default RegistrationConfirmation;
