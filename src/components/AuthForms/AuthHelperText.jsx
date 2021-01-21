import React from "react";
import BodyText from "../utility/BodyText";
import classnames from "classnames";

function AuthHelperText({ className, ...props }) {
	return (
		<BodyText
			className={classnames("AuthForms__HelperText", className)}
			{...props}
		>
			If you have never used this tool before, you must register an account. You
			cannot sign in to the tool with any existing Pacific National accounts.
		</BodyText>
	);
}

export default AuthHelperText;
