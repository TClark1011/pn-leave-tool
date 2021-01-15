import "./RegForm.scss";

import React, { useState } from "react";

import { FastField, Formik, Form, Field } from "formik";

import { registerVal } from "pn-leave-tool-validation";

import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";

import SectionTitle from "../../utility/SectionTitle";
import StatusMessage from "../../utility/StatusMessage";

import { register } from "../../../services/auth";

import DepotSelect from "../../DepotSelect/DepotSelect";
import { useHistory } from "react-router-dom";

function RegForm(props) {
	const [formError, setFormError] = useState(null);

	const history = useHistory();

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);
		register(data)
			.then((result) => {
				history.push(`/register/confirm/${data.employee_number}`);
			})
			.catch((error) => {
				setFormError(error.response.data.error);
				setSubmitting(false);
			});
	}

	return (
		<div className="reg-form">
			<Formik
				initialValues={{
					employee_number: "",
					confirm_employee_number: "",
					password: "",
					confirm_password: "",
					name: "",
					depot: "Loading...",
					email: "",
				}}
				onSubmit={onSubmit}
				validationSchema={registerVal}
				validateOnChange={false}
			>
				{({ isSubmitting, submitForm }) => (
					<Form>
						<SectionTitle>Register New Account</SectionTitle>
						<StatusMessage>{formError}</StatusMessage>
						<FastField
							name="employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FastField
							name="confirm_employee_number"
							inputProps={{ maxLength: 6 }}
							component={FormField}
						/>
						<FastField name="password" component={FormField} type="password" />
						<FastField
							name="confirm_password"
							component={FormField}
							type="password"
						/>
						<FastField name="name" component={FormField} />
						<Field name="depot" component={DepotSelect} />
						<FastField name="email" component={FormField} />
						<FormButton type="submit" disabled={isSubmitting}>
							{isSubmitting ? "loading" : "submit"}
						</FormButton>
					</Form>
				)}
			</Formik>
		</div>
	);
	//TODO: add a question mark hover to explain the leave field
	//TODO: Scroll to top on form error
}
export default RegForm;
