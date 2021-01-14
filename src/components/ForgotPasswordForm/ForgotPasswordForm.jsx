import "./ForgotPasswordForm.scss";
import { Card } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import BodyText from "../utility/BodyText";
import FormButton from "../utility/Forms/FormButton";
import FormField from "../utility/Forms/FormField";
import SectionTitle from "../utility/SectionTitle";
import { forgotPassword } from "../../services/user";
import StatusMessage from "../utility/StatusMessage";
import forgotPasswordVal from "../../validation/forgotPasswordVal";

function ForgotPasswordForm({ ...props }) {
	const [response, setResponse] = useState({});

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);
		forgotPassword(data.employee_number)
			.then((result) => setResponse(result.data))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	}

	return (
		<Card className="ForgotPasswordForm__root-card">
			<SectionTitle>Forgot Password</SectionTitle>
			<BodyText className="ForgotPasswordForm__above-content">
				Enter your employee number below to reset your password.
			</BodyText>
			<StatusMessage
				className="ForgotPasswordForm__above-content"
				tone={response.tone}
			>
				{response.message}
			</StatusMessage>
			<Formik
				initialValues={{ employee_number: "" }}
				onSubmit={onSubmit}
				validationSchema={forgotPasswordVal}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FormButton
							variant="contained"
							type="submit"
							disabled={isSubmitting}
						>
							reset password
						</FormButton>
					</Form>
				)}
			</Formik>
		</Card>
	);
}

export default ForgotPasswordForm;
