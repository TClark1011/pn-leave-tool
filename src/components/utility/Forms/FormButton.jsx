import React from "react";

import Button from "@material-ui/core/Button";

import FormItem from "./FormItem";

const FormButton = ({ children, className, ...props }) => (
	<FormItem
		as={Button}
		variant="contained"
		fullWidth
		color="primary"
		disableElevation={true}
		{...props}
	>
		{children}
	</FormItem>
);

export default FormButton;
