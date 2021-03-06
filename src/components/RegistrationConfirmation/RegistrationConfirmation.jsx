import { Box, Button, Grid, LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { resendVerification } from "../../services/auth";
import BodyText from "../utility/BodyText";
import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

export const regConfirmSectionTitle = "Verify your email";

export const regConfirmDescription =
	"Thank you for registering. We have sent an email containing a verification link to your provided email address.";

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

	/**
	 * Resend validation email
	 */
	const resendEmail = () => {
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
	};
	return (
		<Box>
			<SectionTitle>{regConfirmSectionTitle}</SectionTitle>
			<StatusMessage tone={response.tone}>{response.message}</StatusMessage>
			<BodyText>{regConfirmDescription}</BodyText>
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

/**
 * Buttons for executing actions on the registration confirmation screen
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @returns {ReactNode} The component's rendered elements
 */
const ActionButton = ({ children, ...props }) => (
	<Button variant="outlined" {...props}>
		{children}
	</Button>
);

export default RegistrationConfirmation;
