import "./LoginForm.scss";

import React from "react";

import axios from "axios";

import { TextField, Button, Typography, Collapse } from "@material-ui/core";

import SectionTitle from "../utility/SectionTitle";
import StatusMessage from "../utility/StatusMessage";

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
			first_name: "",
			first_name_error: null,
			last_name: "",
			last_name_error: null,
			email: "",
			email_error: null,
			phone: "",
			phone_error: null,
			leave: 0,
			leave_error: null,
			show_reg_fields: false, //? registration-specific field visibility
			form_error: null,
		};
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
		first_name: (value) => {
			this.setState({ first_name: value });
		},
		last_name: (value) => {
			this.setState({ last_name: value });
		},
		email: (value) => {
			this.setState({ email: value });
		},
		phone: (value) => {
			this.setState({ phone: value });
		},
		leave: (value) => {
			this.setState({ leave: value });
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
				//* Password
				value: this.state.password,
				setError: (value) => {
					this.setState({ password_error: value });
				},
				checkError: () => null,
				required: true,
				reg_only: false,
			},
			{
				//* Confirmation Password
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
			//# If Extra registration fields are currently hidden...
			this.setState({ show_reg_fields: true }); //*...show them
		} else {
			//# Extra reg fields ewre already visible, now validate and send form contents
			if (this.validateFields()) {
				axios
					.post("/api/users/register", {
						employee_number: this.state.employee_number,
						password: this.state.password,
						first_name: this.state.first_name,
						last_name: this.state.last_name,
						email: this.state.email,
						phone: this.state.phone,
						leave: this.state.leave,
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

	//TODO: Change form title/description when switching to register mode
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
				<Typography variant="body1">
					To sign in, enter your account details and click 'LOGIN'. To register
					a new account, enter your Pacific National Employee Number and your
					desired Password and click 'REGISTER'
				</Typography>
				<StatusMessage>{this.state.form_error}</StatusMessage>
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
						<AuthField
							label="First Name"
							onChange={(e) => this.handlers.first_name(e.target.value)}
							value={this.state.first_name}
						/>
						<AuthField
							label="Last Name"
							onChange={(e) => this.handlers.last_name(e.target.value)}
							value={this.state.last_name}
						/>
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
							value={this.state.phone}
						/>
						<AuthField
							label="Stored Leave"
							type="Number"
							onChange={(e) => this.handlers.leave(e.target.value)}
							value={this.state.leave}
						/>
					</Collapse>
					<Collapse in={!this.state.show_reg_fields}>
						<FormButton
							variant="contained"
							onClick={() => this.login()}
							className="login-button"
						>
							Login
						</FormButton>
					</Collapse>
					<FormButton variant="outlined" onClick={() => this.register()}>
						{this.state.show_reg_fields ? "Confirm" : "Register"}
					</FormButton>
					{/* TODO: Registration frontend requests */}
				</form>
			</div>
		);
	}
	//TODO: Password reset
	//TODO: If user is redirected here from try to access protected route, show a message explaining this
}

function FormButton(props) {
	return (
		<Button
			color="primary"
			fullWidth
			disableElevation
			{...props}
			className={`form-item ${props.className}`}
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
	return (
		<TextField
			variant="outlined"
			color="primary"
			fullWidth
			className="form-item"
			{...props}
		/>
	);
}

export default LoginForm;
