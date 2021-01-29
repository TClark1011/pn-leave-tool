import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormButton from "../utility/Forms/FormButton";
import FormField from "../utility/Forms/FormField";
import SectionTitle from "../utility/SectionTitle";
import { forgotPassword } from "../../services/user";
import { forgotPasswordVal } from "pn-leave-tool-common";
import setDocTitle from "../../utils/setDocTitle";
import {
	ForgotPasswordHelpText,
	ForgotPasswordStatusMessage,
} from "./ForgotPassword.styles";
import ContentCard from "../utility/ContentCard";

function ForgotPasswordForm({ ...props }) {
	setDocTitle("Forgot Password");
	const [response, setResponse] = useState({});

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);
		forgotPassword(data.employee_number)
			.then((result) => setResponse(result.data))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	}

	return (
		<ContentCard>
			<SectionTitle>Forgot Password</SectionTitle>
			<ForgotPasswordHelpText>
				Enter your employee number below to reset your password.
			</ForgotPasswordHelpText>
			<ForgotPasswordStatusMessage tone={response.tone}>
				{response.message}
			</ForgotPasswordStatusMessage>
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
		</ContentCard>
	);
}

export default ForgotPasswordForm;
