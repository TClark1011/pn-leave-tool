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
	const [showRegFields, setShowRegFields] = useState(false);

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

	async function onRegister(data) {
		setShowRegFields(true);
	}

	if (user) {
		return <h1>Employee #{user.employee_number}</h1>;
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
			}) => {
				function FormField(props) {
					return (
						<Field
							type="input"
							as={AuthField}
							error={Boolean(errors[props.name])}
							helperText={errors[props.name]}
							{...props}
						/>
					);
				}
				return (
					<Form>
						<SectionTitle>Login</SectionTitle>
						<StatusMessage>{formError}</StatusMessage>
						<FormField
							type="input"
							name="employee_number"
							inputProps={{ maxLength: 6 }}
						/>
						<FormField name="password" inputProps={{ maxLength: 24 }} />
						<Collapse in={showRegFields}>
							<h5>Reg fields</h5>
						</Collapse>
						<Collapse in={!showRegFields} className="form-item">
							<AuthButton
								variant="contained"
								type="submit"
								disabled={isSubmitting}
							>
								submit
							</AuthButton>
						</Collapse>
						<AuthButton variant="outlined" onClick={onRegister}>
							{showRegFields ? "confirm" : "register"}
						</AuthButton>
					</Form>
				);
			}}
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
