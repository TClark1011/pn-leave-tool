import React from "react";

import { getIn } from "formik";

import TextField from "@material-ui/core/TextField";

import classNames from "classnames";

import formatLabel from "../../../../services/formatLabel";

function FormField({ field, form, className, ...props }) {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	function formatErrorText() {
		return errorText
			? errorText.replace(new RegExp(field.name, "g"), formatLabel(field.name))
			: "";
	}
	return (
		<TextField
			fullWidth
			color="primary"
			helperText={formatErrorText()}
			error={!!errorText}
			variant="outlined"
			label={formatLabel(field.name)}
			className={classNames("form-item", className)}
			{...field}
			{...props}
		/>
	);
}

export default FormField;
