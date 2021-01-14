import { Card } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../services/user";
import resetPasswordVal from "../../validation/resetPasswordVal";
import FormButton from "../utility/Forms/FormButton";
import FormField from "../utility/Forms/FormField";
import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

function ResetPasswordForm({ resetKey, ...props }) {
	const [response, setResponse] = useState({});

	const history = useHistory();

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(false);
		resetPassword(data, resetKey)
			.then((result) => history.push("/login"))
			.catch((err) => setResponse(err.response.data))
			.finally(() => setSubmitting(false));
	}

	return (
		<Card>
			<SectionTitle>Reset Password</SectionTitle>
			<StatusMessage tone={response.tone}>{response.message}</StatusMessage>
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
		</Card>
	);
}

export default ResetPasswordForm;
