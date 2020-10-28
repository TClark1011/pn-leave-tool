//# Form for logins and registration
//* Login: User enters number and password, presses 'login' and is then logged in
//* Register: user enters number and desired password, presses 'register', then we check if an account with their number already exists, if not we expand the form to show the other details they need to fill in

import React from "react";

import axios from "axios";

import { TextField, Button, Typography, Collapse } from "@material-ui/core";
import SectionTitle from "../utility/SectionTitle";
import ErrorMessage from "../utility/ErrorMessage";

class LoginForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			employee_number: "",
			employee_number_error: null,
			password: "",
			password_error: null,
			confirmation_password: "",
			confirmation_password_error: null,
			email: "",
			email_error: null,
			phone: "",
			phone_error: null,
			show_reg_fields: false, //* Should registration-specific fields be visible
			form_error: null,
		};
	}

	//#Form change handlers

	passwordHandler(e) {
		//# Update password state value when user types into password field
		const newValue = e.target.value;
		this.setState({ password: newValue });
		if (this.state.password_error === "Required") {
			//# If present, remove 'required' error
			this.setState({ password_error: null });
		}
	}

	handlers = {
		//# Object containing change handlers for all form fields
		employee_number: (value) => {
			if (Number(value) || value === "") {
				//# Do not accept value that contains non-numeral characters
				this.setState({ employee_number: value });
				if (this.state.employee_number_error === "Required" || "Numbers Only") {
					//# If present, remove 'required' error
					this.setState({ employee_number_error: null });
				}
			} else {
				this.setState({ employee_number_error: "Numbers Only" });
			}
		},
		password: (value) => {
			this.setState({ password: value });
			if (this.state.password_error === "Required") {
				//# If present, remove 'required' error
				this.setState({ password_error: null });
			}
		},
		confirmation_password: (value) => {
			this.setState({ confirmation_password: value });
		},
		email: (value) => {
			this.setState({ email: value });
		},
	};

	validateFields() {
		//# Iterate through field data and make sure they all meet validation conditions
		//# Fields with invalid values are marked with corresponding errors
		const allFields = [
			//# Store all field data required for validation in objects
			/**
			 * Field validation object structure
			 * @property value    { any }              => The variable where the fields value is stored
			 * @property setError { function(string) } => Sets the field's error to the passed string
			 * @property checkError { functiion() }      => Checks validation requirements and return an object representing any validation errors or null if none found
			 * @property required { boolean }          => If the field is required for form submission
			 */
			{
				//* Employee number
				value: this.state.employee_number,
				setError: (value) => {
					this.setState({ employee_number_error: value });
				},
				checkError: () => null,
				required: true,
				reg_only: false,
			},
			{
				//* Employee number
				value: this.state.password,
				setError: (value) => {
					this.setState({ password_error: value });
				},
				checkError: () => null,
				required: true,
				reg_only: false,
			},
			{
				value: this.state.confirmation_password,
				setError: (value) => {
					this.setState({ confirmation_password_error: value });
				},
				checkError: () => {
					if (this.state.confirmation_password !== this.state.password) {
						return {
							form_error: "Password fields must match",
							field_error: "Does not match",
						};
					}
				},
				required: this.state.show_reg_fields,
				reg_only: true,
			},
			//TODO: Update to handle extra registration fields
		];

		var formIsValid = true;

		for (const field of allFields) {
			//# Iterate through field values
			if ((field.reg_only && this.state.show_reg_fields) || !field.reg_only) {
				const fieldError = field.checkError();
				if (fieldError) {
					//# If field validation function found an error...
					field.setError(fieldError.field_error);
					if (fieldError.form_error) {
						this.setState({ form_error: fieldError.form_error });
					}
				}
				if (field.required && !field.value) {
					//#If a required field is empty
					field.setError("Required");
					this.setState({
						form_error: "Please make sure all highlighted fields are not empty",
					});
					formIsValid = false;
				}
			}
		}

		return formIsValid;
	}

	// clearErrors(errors) {
	//     //# Will clear the current form error if it is contained in the passed list of errors
	// }

	login() {
		//# Submit field data
		if (this.validateFields()) {
			axios
				.post("/api/users/login", {
					employee_number: this.state.employee_number,
					password: this.state.password,
				})
				.then((response) => {
					console.log(response.data);
					this.props.setUserFn(response.data);
					//* If login request was successful, set the user object
				})
				.catch((error) => {
					this.setState({ form_error: error.response.data.error });
					//* Set form error state if the request returned an error
				});
		}
	}

	register() {
		if (!this.state.show_reg_fields) {
			this.setState({ show_reg_fields: true });
		} else {
			//# Secondary 'confirmation' registration request (user has filled out all registration fields)
			if (this.validateFields()) {
				axios
					.post("/api/users/register", {
						employee_number: this.state.employee_number,
						password: this.state.password,
					})
					.then((response) => {
						console.log(response.data);
					})
					.catch((error) => {
						this.setState({ form_error: error.response.data.error });
					});
			}
		}
	}

	//TODO: Password reset

	render() {
		if (this.props.user) {
			return (
				<div className="login-form container">
					<SectionTitle>
						You are signed in as Employee #{this.props.user.employee_number}
					</SectionTitle>
				</div>
			);
		}

		return (
			<div className="login-form container">
				<SectionTitle>Login</SectionTitle>
				<Typography>
					To sign in, enter your account details and click 'LOGIN'. To register
					a new account, enter your Pacific National Employee Number and your
					desired Password and click 'REGISTER'
				</Typography>
				<ErrorMessage>{this.state.form_error}</ErrorMessage>
				<form>
					<AuthField
						label={"Employee Number"}
						type="tel"
						onChange={(e) => this.handlers.employee_number(e.target.value)}
						value={this.state.employee_number}
						error={this.state.employee_number_error ? true : false}
						helperText={this.state.employee_number_error}
						style={{ marginTop: 8 }}
					/>
					<AuthField
						label={"Password"}
						type="password"
						onChange={(e) => this.handlers.password(e.target.value)}
						value={this.state.password}
						error={this.state.password_error ? true : false}
						helperText={this.state.password_error}
					/>
					<Collapse in={this.state.show_reg_fields}>
						{/* ? Extra fields for registration are initially hidden */}
						{/* TODO: Extra field handling */}
						{/* TODO: Extra field validation */}
						<AuthField
							label={"Confirm Password"}
							type="password"
							value={this.state.confirmation_password}
							error={this.state.confirmation_password_error ? true : false}
							onChange={(e) =>
								this.handlers.confirmation_password(e.target.value)
							}
							helperText={this.state.confirmation_password_error}
						/>
						<AuthField label="Name" />
						<AuthField
							label="Email Address"
							onChange={(e) => this.handlers.email(e.target.value)}
							value={this.state.email}
							type="email"
						/>
						<AuthField
							label="Phone No."
							type="tel"
							onChange={(e) => this.handlers.phone(e.target.value)}
						/>
						<AuthField />
					</Collapse>
					<Collapse in={!this.state.show_reg_fields}>
						<Button
							fullWidth
							className="form-input"
							color="primary"
							variant="contained"
							disableElevation
							onClick={() => this.login()}
							className="form-input"
						>
							Login
						</Button>
					</Collapse>
					<Button
						fullWidth
						color="primary"
						className="form-input"
						variant="outlined"
						onClick={() => this.register()}
						disableElevation
					>
						{this.state.show_reg_fields ? "Confirm" : "Register"}
					</Button>
					{/* TODO: Registration frontend requests */}
				</form>
			</div>
		);
	}
}

function AuthField(props) {
	return <TextField variant="outlined" color="primary" fullWidth {...props} />;
}

export default LoginForm;
