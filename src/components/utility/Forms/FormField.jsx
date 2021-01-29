import React from "react";

import { getIn } from "formik";

import TextField from "@material-ui/core/TextField";

import formatLabel from "../../../utils/formatLabel";
import FormItem from "./FormItem";

function FormField({ field, form, label, className, ...props }) {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	function formatErrorText() {
		return errorText
			? errorText.replace(new RegExp(field.name, "g"), formatLabel(field.name))
			: "";
	}
	field = field || {};
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
}

export default FormField;
