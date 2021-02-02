import React from "react";

import { getIn } from "formik";

import TextField from "@material-ui/core/TextField";

import formatLabel from "../../../utils/formatLabel";
import FormItem from "./FormItem";

/**
 * A field to be used in a form
 *
 * @param {object} props The component props
 * @param  {object} [props.field={}] The field props (supplied by Formik)
 * @param  {object} props.form Form data (supplied by Formik)
 * @param {string} label The field's label
 * @returns {ReactNode} A form field
 */
const FormField = ({ field = {}, form, label, ...props }) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	/**
	 * Apply visual formatting to error text
	 *
	 * @returns {string} Formatted error text
	 */
	const formatErrorText = () => {
		return errorText
			? errorText.replace(new RegExp(field.name, "g"), formatLabel(field.name))
			: "";
	};
	return (
		<FormItem
			as={TextField}
			fullWidth
			color="primary"
			helperText={formatErrorText()}
			error={!!errorText}
			variant="outlined"
			label={label || label === "" ? label : formatLabel(field.name)}
			{...field}
			{...props}
		/>
	);
};

export default FormField;
