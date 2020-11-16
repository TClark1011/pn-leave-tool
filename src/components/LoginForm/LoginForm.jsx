import "./LoginForm.scss";

import React, { useContext, useState } from "react";

import axios from "axios";

import { Formik, Field, Form } from "formik";

import { TextField, Button, Typography, Collapse } from "@material-ui/core";

import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

import loginVal from "../../validation/loginVal";

import UserContext from "../utility/UserContext";

import { login } from "../../services/api";

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
	//TODO: Registration
	const { user, setUser } = useContext(UserContext);

	const [formError, setFormError] = useState(null);

	async function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);

		console.log(data);
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
		<Formik
			initialValues={{ employee_number: "", password: "" }}
			onSubmit={onSubmit}
			validationSchema={loginVal}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{({
				values,
				isSubmitting,
				handleChange,
				handleBlur,
				handleSubmit,
				errors,
			}) => (
				<Form>
					<StatusMessage>{formError}</StatusMessage>
					<Field
						type="input"
						name="employee_number"
						as={AuthField}
						inputProps={{ maxLength: 6 }}
						error={Boolean(errors.employee_number)}
						helperText={errors.employee_number}
					/>
					<Field
						type="input"
						name="password"
						as={AuthField}
						inputProps={{ maxLength: 24 }}
						error={Boolean(errors.password)}
						helperText={errors.password}
					/>
					<AuthButton variant="contained" type="submit" disabled={isSubmitting}>
						submit
					</AuthButton>
					<AuthButton variant="outlined">register</AuthButton>
				</Form>
			)}
		</Formik>
	);

	function AuthButton(props) {
		return (
			<Button
				fullWidth
				color="primary"
				disableElevation
				className="form-item"
				{...props}
			>
				{props.children}
			</Button>
		);
	}

	function AuthField(props) {
		const autoProps = {};
		if (props.fieldName && props.form) {
			autoProps.onChange = (e) =>
				props.form.handlers[props.fieldName](e.target.value);
			autoProps.value = props.form.state[props.fieldName];
		}
		const label = props.name
			? {
					label: nameToLabel(props.name),
			  }
			: {};
		return (
			<TextField
				variant="outlined"
				color="primary"
				fullWidth
				className="form-item"
				{...label}
				{...props}
			/>
		);
	}
}

export default LoginForm;

// export default LoginForm;
