import "./LoginForm.scss";

import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";

import { Formik, Field, Form } from "formik";

import UserContext from "../../utility/UserContext";

import SectionTitle from "../../utility/SectionTitle";
import StatusMessage from "../../utility/StatusMessage";
import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";

import loginVal from "../../../validation/loginVal";

import { login } from "../../../services/auth";
import { loginRedir } from "../../../constants/autoNavParams";

const redirectedMsg = "An error occurred, please login to proceed";

const getStartingStatus = () => {
	switch (window.location.search) {
		case "?redir":
			return { message: redirectedMsg, tone: "negative" };
		case "?verified":
			return {
				message: "Your account has been verified and you can now sign in",
				tone: "positive",
			};
		default:
			return null;
	}
};

function LoginForm(props) {
	const { setUser } = useContext(UserContext);

	const [formError, setFormError] = useState(getStartingStatus());

	const history = useHistory();

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);

		login(data)
			.then((result) => {
				setUser(result.data);
				history.push(loginRedir);
			})
			.catch((error) => {
				setFormError({ message: error.response.data });
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<div className="login-form">
			<Formik
				initialValues={{ employee_number: "", password: "" }}
				onSubmit={onSubmit}
				validationSchema={loginVal}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<SectionTitle>Login</SectionTitle>
						<StatusMessage tone={formError?.tone || "negative"}>
							{formError?.message}
						</StatusMessage>
						<Field
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<Field
							name="password"
							inputProps={{ maxLength: 24 }}
							component={FormField}
							type="password"
						/>
						<FormButton
							variant="contained"
							type="submit"
							disabled={isSubmitting}
						>
							submit
						</FormButton>
						<FormButton
							variant="outlined"
							onClick={() => props.setTab("register")}
						>
							register
						</FormButton>
					</Form>
				)}
			</Formik>
		</div>
	);
	//TODO: Add redirected error message
}

export default LoginForm;
