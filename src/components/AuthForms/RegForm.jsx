import React, { useState } from "react";

import { FastField, Formik, Form, Field } from "formik";

import { registerVal, testingRegisterVal } from "pn-leave-tool-common";

import FormField from "../utility/Forms/FormField";
import FormButton from "../utility/Forms/FormButton";

import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

import { register } from "../../services/auth";

import DepotSelect from "../DepotSelect/DepotSelect";
import { useHistory } from "react-router-dom";

import AuthHelperText from "./AuthHelperText";
import { Box } from "@material-ui/core";
import useDocTitle from "../../utils/useDocTitle";
import { validateEmail } from "../../constants/env";

/**
 * Registration form
 *
 * @returns {ReactNode} Registration form
 */
const RegForm = () => {
	useDocTitle("Register");
	const [formError, setFormError] = useState(null);

	const history = useHistory();

	const validationSchema = validateEmail ? registerVal : testingRegisterVal;

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
		register(data)
			.then(() => {
				history.push(`/register/confirm/${data.employee_number}`);
				//? Redirect to registration confirmation screen
			})
			.catch((error) => {
				setFormError(error.response.data.message);
				setSubmitting(false);
				window.scrollTo(0, 0);
				//? Scroll to top on error so user can see the error message
			});
	};

	return (
		<Box>
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
				validationSchema={validationSchema}
				validateOnChange={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<SectionTitle>Register New Account</SectionTitle>
						<AuthHelperText />
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
		</Box>
	);
};
export default RegForm;
