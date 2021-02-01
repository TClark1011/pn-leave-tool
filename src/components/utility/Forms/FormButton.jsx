import React from "react";

import Button from "@material-ui/core/Button";

import FormItem from "./FormItem";

/**
 * A button to be used in a form
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The button element
 * @returns {ReactNode} The button content
 */
const FormButton = ({ children, ...props }) => (
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
