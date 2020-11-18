import "./RegForm.scss";

import React, { useState, useContext } from "react";

import { FastField, Formik, Form } from "formik";

import UserContext from "../../utility/UserContext";

import registerVal from "../../../validation/registerVal";

import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";

import SectionTitle from "../../utility/SectionTitle";

import { register } from "../../../services/api";

function RegForm(props) {
	const { user, setUser } = useContext(UserContext);

	const [formError, setFormError] = useState(null);

	async function onSubmit(data, { setSubmitting }) {
		console.log("submitting registration data...");
		setSubmitting(true);

		const result = await register(data);

		const isError = !!result.response;
		//? result will only have the 'response' field if it is an error
		if (isError) {
			setFormError(result.response.data.error);
		}
		setUser(result.data);

		setSubmitting(false);
	}

	return (
		<div className="reg-form">
			<SectionTitle>Register New Account</SectionTitle>
			<Formik
				initialValues={{
					employee_number: "",
					password: "",
					confirm_password: "",
					first_name: "",
					last_name: "",
					email: "",
					phone: "",
					leave: 0,
				}}
				onSubmit={onSubmit}
				validationSchema={registerVal}
				validateOnChange={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<FastField
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FastField name="password" component={FormField} />
						<FastField name="confirm_password" component={FormField} />
						<FastField name="first_name" component={FormField} />
						<FastField name="last_name" component={FormField} />
						<FastField name="email" component={FormField} />
						<FastField name="phone" component={FormField} />
						<FastField name="leave" component={FormField} type="number" />
						<FormButton type="submit" disabled={isSubmitting}>
							submit
						</FormButton>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default RegForm;
