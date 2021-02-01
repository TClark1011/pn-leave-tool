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
import setDocTitle from "../../utils/setDocTitle";
import ContentCard from "../utility/ContentCard";
import AboveFormContent from "../utility/Forms/AboveFormContent";

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
	setDocTitle("Reset Password");
	const [response, setResponse] = useState({});

	const history = useHistory();

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(false);
		resetPassword(data, resetKey)
			.then((result) => history.push("/login?passwordUpdated"))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	}

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
