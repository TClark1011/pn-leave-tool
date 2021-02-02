import React from "react";
import { AuthHelperTextWrapper } from "./AuthForms.styles";

/**
 * Help text that appears in both the login and registration
 * form.
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @returns {ReactNode} The component's rendered elements
 */
const AuthHelperText = ({ ...props }) => {
	return (
		<AuthHelperTextWrapper {...props}>
			If you have never used this tool before, you must register an account. You
			cannot sign in to the tool with any existing Pacific National accounts.
		</AuthHelperTextWrapper>
	);
};

export default AuthHelperText;
