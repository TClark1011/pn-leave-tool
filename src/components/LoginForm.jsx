//# Form for logins and registration
//* Login: User enters number and password, presses 'login' and is then logged in
//* Register: user enters number and desired password, presses 'register', then we check if an account with their number already exists, if not we expand the form to show the other details they need to fill in

import React from "react";

import { TextField, Button } from "@material-ui/core";

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
            employee_id: "",
            employee_id_error:null,
            password: "",
            password_error:null
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
        const allFieldItems = [
            {
                value:this.state.employee_id,
                setError:(value) => this.setState({employee_id_error:value})
            },
            {
                value:this.state.password,
                setError:(value) => this.setState({password_error:value})
            }
        ]
        var formIsValid = true;
		for (const item of allFieldItems) { 
			if (!item.value) { //# If field is empty
                item.setError("Required");
                formIsValid = false;
			}
        }
        if (formIsValid) {
            //TODO: Form post request
        }
	}

	render() {
		return (
			<div className="login-form container">
				<form>
					<TextField
						fullWidth
                        color="primary"
						variant="outlined"
						className="form-input employee_id"
						label="Employee Number"
						type="tel"
						onChange={(e) => this.employeeIdHandler(e)}
						value={this.state.employee_id}
                        error={this.state.employee_id_error ? true : false}
                        helperText={this.state.employee_id_error}
					/>
					<TextField
						fullWidth
                        color="primary"
						variant="outlined"
						className="form-input password"
						label="Password"
						type="password"
						onChange={(e) => this.passwordHandler(e)}
						value={this.state.password}
						error={this.state.password_error ? true : false}
                        helperText={this.state.password_error}
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
