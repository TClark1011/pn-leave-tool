import "./RegForm.scss";

import React, { useMemo, useState } from "react";

import { FastField, Formik, Form, Field } from "formik";

import registerVal from "../../../validation/registerVal";

import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";

import SectionTitle from "../../utility/SectionTitle";
import StatusMessage from "../../utility/StatusMessage";
import BodyText from "../../utility/BodyText";

import { register, resendVerification } from "../../../services/auth";

import { Button, Dialog, LinearProgress, MenuItem } from "@material-ui/core";

import { useQuery } from "react-query";
import { getDepots } from "../../../services/depots";
import DepotSelect from "../../DepotSelect/DepotSelect";

function RegForm(props) {
	const [formError, setFormError] = useState(null);
	const [
		openVerificationInstructions,
		setOpenVerificationInstructions,
	] = useState(false);

	const [resentEmail, setResentEmail] = useState(false);

	function onSubmit(data, { setSubmitting }) {
		if (openVerificationInstructions) {
			setResentEmail("loading");
			resendVerification(data.employee_number)
				.then(() => {
					console.log("email has been resent");
					setResentEmail(true);
				})
				.catch((error) => {
					setResentEmail(false);
					setOpenVerificationInstructions(false);
					setFormError(error.response.body.data.error);
				});
		} else {
			setSubmitting(true);
			register(data)
				.then((result) => {
					setOpenVerificationInstructions(true);
				})
				.catch((error) => {
					setFormError(error.response.data.error);
				})
				.finally(() => {
					setSubmitting(false);
				});
		}
	}

	return (
		<div className="reg-form">
			<SectionTitle>Register New Account</SectionTitle>
			<Formik
				initialValues={{
					employee_number: "",
					confirm_employee_number: "",
					password: "",
					confirm_password: "",
					name: "",
					depot: "Loading...",
					email: "",
				}}
				onSubmit={onSubmit}
				validationSchema={registerVal}
				validateOnChange={false}
			>
				{({ isSubmitting, submitForm }) => (
					<Form>
						<StatusMessage>{formError}</StatusMessage>
						<FastField
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FastField
							name="confirm_employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FastField name="password" component={FormField} type="password" />
						<FastField
							name="confirm_password"
							component={FormField}
							type="password"
						/>
						<FastField name="name" component={FormField} />
						<Field name="depot" component={DepotSelect} />
						<FastField name="email" component={FormField} />
						<FormButton type="submit" disabled={isSubmitting}>
							submit
						</FormButton>

						<Dialog
							open={openVerificationInstructions}
							className="register-verification-instructions"
						>
							<StatusMessage tone="neutral">
								<h3>Verify your email</h3>
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
										Close
									</ActionButton>
									<ActionButton onClick={submitForm}>Resend Email</ActionButton>
								</div>
								<div className="resend-msg">
									{resentEmail === true && (
										<BodyText>We have sent you another email</BodyText>
									)}
									{resentEmail === "loading" && (
										<LinearProgress
											color="primary"
											className="resend-loading"
										/>
									)}
								</div>
							</StatusMessage>
						</Dialog>
					</Form>
				)}
			</Formik>
		</div>
	);
	//TODO: add a question mark hover to explain the leave field
	//TODO: Scroll to top on form error
}

const ActionButton = ({ children, ...props }) => (
	<Button variant="outlined" {...props}>
		{children}
	</Button>
);

export default RegForm;
