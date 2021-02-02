import React, { useContext, useState } from "react";

import { useHistory, Link } from "react-router-dom";

import { Formik, Field, Form } from "formik";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";
import FormField from "../utility/Forms/FormField";
import FormButton from "../utility/Forms/FormButton";

import { loginVal } from "pn-leave-tool-common";

import { login } from "../../services/auth";
import { loggedInCookie, loginRedir } from "../../constants/autoNavParams";

import AuthHelperText from "./AuthHelperText";
import { Box } from "@material-ui/core";
import useDocTitle from "../../utils/useDocTitle";

const redirectedMsg = "An error occurred, please login to proceed";

//# Display a status message depending on the url search parameters
const getStartingStatus = () => {
	switch (window.location.search) {
		case "?redir":
			//# If an error caused user to be sent back to login screen
			return { message: redirectedMsg, tone: "negative" };
		case "?verified":
			//# If user has been directed to login after verifying their account
			return {
				message: "Your account has been verified and you can now sign in",
				tone: "positive",
			};
		case "?passwordUpdated":
			//# If user has been directed to login after resetting their password
			return {
				message: "Your password was updated successfully",
				tone: "positive",
			};
		default:
			return null;
	}
};

/**
 * The login form
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @returns {ReactNode} The component's rendered elements
 */
const LoginForm = ({ setTab }) => {
	useDocTitle("Login");
	const { setUser } = useContext(UserContext);

	const [formError, setFormError] = useState(getStartingStatus());

	const history = useHistory();

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

		login(data)
			.then((result) => {
				document.cookie = loggedInCookie;
				//? Set cookie so user will be redirected to login page from landing page from now on
				setUser(result.data);
				history.push(loginRedir);
				//? Redirect after login
			})
			.catch((err) => {
				setFormError({ message: err.response.data.message });
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	return (
		<Box>
			<Formik
				initialValues={{ employee_number: "", password: "" }}
				onSubmit={onSubmit}
				validationSchema={loginVal}
				validateOnChange={true}
				validateOnBlur={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<SectionTitle>Login</SectionTitle>
						<AuthHelperText />
						<StatusMessage
							tone={formError?.tone || "negative"}
							hideSupportMsg={
								formError?.message === "Incorrect employee number or password"
							}
						>
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
							{isSubmitting ? "loading" : "submit"}
						</FormButton>
						<FormButton variant="outlined" onClick={() => setTab("register")}>
							register
						</FormButton>
						<FormButton
							variant="text"
							onClick={() => setTab("register")}
							component={Link}
							to="/forgotPassword"
						>
							forgot password
						</FormButton>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default LoginForm;
