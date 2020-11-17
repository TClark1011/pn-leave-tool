import React from "react";

import Button from "@material-ui/core/Button";

import classNames from "classnames";

const FormButton = ({ children, className, ...props }) => (
	<Button
		variant="contained"
		fullWidth
		color="primary"
		disableElevation={true}
		className={classNames("form-item", className)}
		{...props}
	>
		{children}
	</Button>
);

export default FormButton;
