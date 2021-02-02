import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormButton from "../utility/Forms/FormButton";
import FormField from "../utility/Forms/FormField";
import SectionTitle from "../utility/SectionTitle";
import { forgotPassword } from "../../services/user";
import { forgotPasswordVal } from "pn-leave-tool-common";
import {
	ForgotPasswordHelpText,
	ForgotPasswordStatusMessage,
} from "./ForgotPassword.styles";
import ContentCard from "../utility/ContentCard";
import useDocTitle from "../../utils/useDocTitle";

/**
 * Forgot Password Form
 *
 * @returns {ReactNode} Forgot Password form
 */
const ForgotPasswordForm = () => {
	useDocTitle("Forgot Password");
	const [response, setResponse] = useState({});

	/**
	 * Handle form submission.
	 *
	 * @param {Object} data Data from form fields
	 * @param {Object} formProps Formik form props
	 * @param {Function} formProps.setSubmitting Set
	 * whether or not the form is currently submitting.
	 */
	const onSubmit = (data, { setSubmitting }) => {
		setSubmitting(true);
		forgotPassword(data.employee_number)
			.then((result) => setResponse(result.data))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	};

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
};

export default ForgotPasswordForm;
