//# Form for logins and registration
//* Login: User enters number and password, presses 'login' and is then logged in
//* Register: user enters number and desired password, presses 'register', then we check if an account with their number already exists, if not we expand the form to show the other details they need to fill in

import React from "react";

import { TextField, Button } from "@material-ui/core";
import SectionTitle from "./SectionTitle"

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
            employee_id: "",
            employee_id_error:null,
            password: "",
            password_error:null,
            form_error:null
		};
	}

	//#Form change handlers
	employeeIdHandler(e) {
		//#Handle change to password
		const newValue = e.target.value;
		if (Number(newValue) || newValue === "") {
			//*Only accept change if the new value is all numbers or it is empty
            this.setState({ employee_id: newValue });
            if (this.state.employee_id_error === "Required") { //# If present, remove 'required' error 
                this.setState({employee_id_error:null})
            }
		}
	}
	passwordHandler(e) {
		const newValue = e.target.value;
        this.setState({ password: newValue });
        if (this.state.password_error === "Required") { //# If present, remove 'required' error 
            this.setState({password_error:null})
        }
	}

	submit() {
        const allFields = [ //# Store all data required to validate fields
            {
                value:this.state.employee_id,
                setError:(value) => {
                    this.setState({employee_id_error:value});
                    // this.setState({employee_id_label:"Employee Number"})
                },
                required:true,
            },
            {
                value:this.state.password,
                setError: (value) => {
                    this.setState({password_error:value});
                },
                required:true,
            }
        ]

        var formIsValid = true;

        for (const field of allFields) { //# Iterate through field values
            if(field.required && !field.value) { //#If a required field is empty
                field.setError("Required")
                formIsValid = false;
            }
        }

        if (formIsValid) {
            console.log("dummy form submission");
            //TODO: Form post request
        }
    }

	render() {
		return (
			<div className="login-form container">
                <SectionTitle>Login</SectionTitle>
				<form>
					<TextField
						fullWidth
                        color="primary"
						variant="outlined"
						className="form-input field employee_id"
						label={"Employee Number" + (this.state.employee_id_error ? ` (${this.state.employee_id_error})` : "")}
						type="tel"
						onChange={(e) => this.employeeIdHandler(e)}
						value={this.state.employee_id}
                        error={this.state.employee_id_error ? true : false}
					/>
					<TextField
						fullWidth
                        color="primary"
						variant="outlined"
						className="form-input field password"
						label={"Password" + (this.state.password_error ? ` (${this.state.password_error})` : "")}
						type="password"
						onChange={(e) => this.passwordHandler(e)}
						value={this.state.password}
						error={this.state.password_error ? true : false}
					/>
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
						disableElevation
					>
						Register
					</Button>
				</form>
				{/* TODO: Don't allow empty fields */}
				{/* TODO: Add extra fields for registration */}
			</div>
		);
	}
}

export default LoginForm;
