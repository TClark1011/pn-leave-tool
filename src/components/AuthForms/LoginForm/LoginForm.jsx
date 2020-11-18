import "./LoginForm.scss";

import React, { useContext, useState } from "react";

import { Formik, Field, Form } from "formik";

import { TextField, Button, Typography, Collapse } from "@material-ui/core";

import UserContext from "../../utility/UserContext";

import SectionTitle from "../../utility/SectionTitle";
import StatusMessage from "../../utility/StatusMessage";
import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";

import loginVal from "../../../validation/loginVal";

import { login } from "../../../services/api";

const redirectedMsg = "An error occurred, please login to proceed";

/**
 * Take a field name and convert it to a properly formatted field label
 * @param {string} name - The name to convert
 * @returns Formatted version of 'name'
 */
function nameToLabel(name) {
	name = name.replace("_", " ");
	var splitStr = name.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

function LoginForm(props) {
	const { user, setUser } = useContext(UserContext);

	const [formError, setFormError] = useState(null);

	async function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);

		await login(data)
			.then((result) => {
				setUser(result.data);
			})
			.catch((error) => {
				setFormError(error.response.data.error);
			});

		setSubmitting(false);
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
						<StatusMessage className="form-item">{formError}</StatusMessage>
						<Field
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<Field
							name="password"
							inputProps={{ maxLength: 24 }}
							component={FormField}
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
}

export default LoginForm;
