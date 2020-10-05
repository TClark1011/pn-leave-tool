//# Form for logins and registration
//* Login: User enters number and password, presses 'login' and is then logged in
//* Register: user enters number and desired password, presses 'register', then we check if an account with their number already exists, if not we expand the form to show the other details they need to fill in

import React from "react";

import axios from "axios";

import { TextField, Button, Typography, Collapse } from "@material-ui/core";
import SectionTitle from "./utility/SectionTitle";
import ErrorMessage from "./utility/ErrorMessage";

class LoginForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			employee_id: "",
			employee_id_error: null,
			password: "",
			password_error: null,
			show_reg_fields: false,
			form_error: null,
		};
	}

	//#Form change handlers
	employeeIdHandler(e) {
		//# Update Employee Number state value when user types into corresponding field
		const newValue = e.target.value;
		if (Number(newValue) || newValue === "") {
			//*Only accept change if the new value is all numbers or it is empty
			this.setState({ employee_id: newValue });
			if (this.state.employee_id_error === "Required") {
				//# If present, remove 'required' error
				this.setState({ employee_id_error: null });
			}
		}
	}
	passwordHandler(e) {
		//# Update password state value when user types into password field
		const newValue = e.target.value;
		this.setState({ password: newValue });
		if (this.state.password_error === "Required") {
			//# If present, remove 'required' error
			this.setState({ password_error: null });
		}
	}

	validateFields() {
		//# Iterate through field data and make sure they all meet validation conditions
		//# Fields with invalid values are marked with corresponding errors
		const allFields = [
			//# Store all data required to validate fields
			//TODO: Update with extra field inf
			{
				value: this.state.employee_id,
				setError: (value) => {
					this.setState({ employee_id_error: value });
				},
				required: true,
			},
			{
				value: this.state.password,
				setError: (value) => {
					this.setState({ password_error: value });
				},
				required: true,
			},
		];

		var formIsValid = true;

		for (const field of allFields) {
			//# Iterate through field values
			if (field.required && !field.value) {
				//#If a required field is empty
				field.setError("Required");
				this.setState({
					form_error: "Please make sure all highlighted fields are not empty",
				});
				formIsValid = false;
			}
		}

		return formIsValid;
	}

	submit() {
		//# Submit field data
		if (this.validateFields()) {
			axios
				.post("/api/login", {
					employee_number: this.state.employee_id,
					password: this.state.password,
				})
				.then((response) => {
					this.props.setUserFn(response.data);
					//* If login request was successful, set the user object
				})
				.catch((error) => {
					this.setState({ form_error: error.response.data.error });
					//* Set form error state if the request returned an error
				});
		}
	}

	render() {
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
					<TextField
						fullWidth
						color="primary"
						variant="outlined"
						className="form-input field employee_id"
						label={
							"Employee Number" +
							(this.state.employee_id_error
								? ` (${this.state.employee_id_error})`
								: "")
						}
						// TODO: Refactor labels with function
						type="tel"
						onChange={(e) => this.employeeIdHandler(e)}
						value={this.state.employee_id}
						error={this.state.employee_id_error ? true : false}
						style={{ marginTop: 8 }}
					/>
					<TextField
						fullWidth
						color="primary"
						variant="outlined"
						className="form-input field password"
						label={
							"Password" +
							(this.state.password_error
								? ` (${this.state.password_error})`
								: "")
						}
						type="password"
						onChange={(e) => this.passwordHandler(e)}
						value={this.state.password}
						error={this.state.password_error ? true : false}
					/>
					<Collapse in={this.state.show_reg_fields}>
						{/* TODO: Extra field handling */}
						{/* TODO: Extra field validation */}
						<TextField
							fullWidth
							color="primary"
							variant="outlined"
							className="form-input field"
							label="Confirm Password"
							type="password"
						/>
						<TextField
							fullWidth
							color="primary"
							variant="outlined"
							className="form-input field"
							label="Name"
						/>
						<TextField
							fullWidth
							color="primary"
							variant="outlined"
							className="form-input field"
							label="Email Address"
							type="email"
						/>
						<TextField
							fullWidth
							color="primary"
							variant="outlined"
							className="form-input field"
							label="Phone No."
							type="tel"
						/>
						<TextField
							fullWidth
							color="primary"
							variant="outlined"
							className="form-input field"
							label="Phone No."
							type="tel"
						/>
					</Collapse>
					<Button
						fullWidth
						className="form-input"
						color="primary"
						variant="contained"
						disableElevation
						onClick={() => this.submit()}
					>
						Login
					</Button>
					<Button
						fullWidth
						color="primary"
						className="form-input"
						variant="outlined"
						onClick={() => this.setState({ show_reg_fields: true })}
						disableElevation
					>
						Register
					</Button>
					{/* TODO: Registration frontend requests */}
				</form>
			</div>
		);
	}
}

export default LoginForm;
