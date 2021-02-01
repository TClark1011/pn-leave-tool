import { Box, Button, Grid, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { resendVerification } from "../../services/auth";
import BodyText from "../utility/BodyText";
import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

/**
 * The registration confirmation screen where user
 * can request validation email resend.
 *
 * @param {object} props The component props
 * @param {string} props.employee_number The employee
 * number of the user who has registered.
 * @returns {ReactNode} The registration confirmation screen
 */
const RegistrationConfirmation = ({ employee_number, ...props }) => {
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
			<Grid container justify="space-around">
				<Grid item>
					<ActionButton
						onClick={() => {
							window.location = "/login";
						}}
					>
						return to login
					</ActionButton>
				</Grid>
				<Grid item>
					<ActionButton onClick={resendEmail}>Resend Email</ActionButton>
				</Grid>
			</Grid>
			<Box>
				{resentEmail === true && (
					<BodyText>We have sent you another email</BodyText>
				)}
				{resentEmail === "loading" && <LinearProgress color="primary" />}
			</Box>
		</Box>
	);
};

const ActionButton = ({ children, ...props }) => (
	<Button variant="outlined" {...props}>
		{children}
	</Button>
);

export default RegistrationConfirmation;
