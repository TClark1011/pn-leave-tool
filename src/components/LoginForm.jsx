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
      password: "",
    };
  }

  //#Form change handlers
  employeeIdHandler(e) {
    //#Handle change to password
    const newValue = e.target.value;
    if (Number(newValue) || newValue === "") {
      //*Only accept change if the new value is all numbers or it is empty
      this.setState({ employee_id: newValue });
    }
  }
  passwordHandler(e) {
    const newValue = e.target.value;
    this.setState({ password: newValue });
  }

  render() {
    return (
      <div className="login-form container">
        <form>
          <TextField
            fullWidth
            className="field employee_id"
            label="Employee Number"
            type="tel"
            onChange={(e) => this.employeeIdHandler(e)}
            value={this.state.employee_id}
          />
          <TextField
            fullWidth
            className="field password"
            label="Password"
            type="password"
            onChange={(e) => this.passwordHandler(e)}
            value={this.state.password}
          />
          <Button fullWidth variant="contained" disableElevation>
            Login
          </Button>
          <Button fullWidth variant="outlined" disableElevation>
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
