import React from "react";
import { AuthHelperTextWrapper } from "./AuthForms.styles";

function AuthHelperText({ ...props }) {
	return (
		<AuthHelperTextWrapper {...props}>
			If you have never used this tool before, you must register an account. You
			cannot sign in to the tool with any existing Pacific National accounts.
		</AuthHelperTextWrapper>
	);
}

export default AuthHelperText;
