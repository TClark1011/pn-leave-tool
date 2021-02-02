import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../services/user";
import { resetPasswordVal } from "pn-leave-tool-common";
import BodyText from "../utility/BodyText";
import FormButton from "../utility/Forms/FormButton";
import FormField from "../utility/Forms/FormField";
import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";
import ContentCard from "../utility/ContentCard";
import AboveFormContent from "../utility/Forms/AboveFormContent";
import useDocTitle from "../../utils/useDocTitle";

/**
 * The form for completing the final step of the password
 * reset process.
 *
 * @param {object} props The component props
 * @param {string} props.resetKey The resetKey used to
 * authenticate the request to reset the password. Is
 * provided in the URL and passed to this component by
 * the Router.
 * @returns {ReactNode} The password reset form
 */
const ResetPasswordForm = ({ resetKey, ...props }) => {
	useDocTitle("Reset Password");
	const [response, setResponse] = useState({});

	const history = useHistory();

	/**
	 * Handle form submission.
	 * If password is successfully reset, redirect
	 * user to login screen.
	 * If there is an error, display erro info in
	 * a status message.
	 *
	 * @param {Object} data Data from form fields
	 * @param {Object} formProps Formik form props
	 * @param {Function} formProps.setSubmitting Set
	 * whether or not the form is currently submitting.
	 */
	const onSubmit = (data, { setSubmitting }) => {
		setSubmitting(false);
		resetPassword(data, resetKey)
			.then((result) => history.push("/login?passwordUpdated"))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	};

	return (
		<ContentCard>
			<SectionTitle>Reset Password</SectionTitle>
			<AboveFormContent as={BodyText}>Enter your new password</AboveFormContent>
			<AboveFormContent as={StatusMessage} tone={response.tone}>
				{response.message}
			</AboveFormContent>
			<Formik
				initialValues={{ password: "", confirm_password: "" }}
				validationSchema={resetPasswordVal}
				validateOnBlur={false}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type="password" name="password" component={FormField} />
						<Field
							type="password"
							name="confirm_password"
							component={FormField}
						/>
						<FormButton
							variant="contained"
							type="submit"
							disabled={isSubmitting}
						>
							update password
						</FormButton>
					</Form>
				)}
			</Formik>
		</ContentCard>
	);
};

export default ResetPasswordForm;
