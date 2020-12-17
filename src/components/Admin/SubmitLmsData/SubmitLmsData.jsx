import React, { useState } from "react";

import csv2json from "csvjson-csv2json";

import { Card, TextField, Button } from "@material-ui/core";

import { submitLmsData } from "../../../services/admin";
import DepotSelect from "../../DepotSelect/DepotSelect";
import { Field, Form, Formik } from "formik";
import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";
import StatusMessage from "../../utility/StatusMessage";
import SectionTitle from "../../utility/SectionTitle";

import lmsDataVal from "../../../validation/lmsDataVal";

const SubmitLmsData = (props) => {
	const [response, setResponse] = useState(null);
	function onFileUpload(file, setFieldValue, validateField) {
		const reader = new FileReader();
		reader.onload = () => {
			const json = csv2json(reader.result, { parseNumbers: true });
			setFieldValue("file", json);
			validateField("file");
		};
		reader.readAsBinaryString(file);
	}

	function onSubmit(data, { setSubmitting }) {
		setSubmitting(true);
		const accessKey = data.accessKey || "_";
		delete data.accessKey;
		submitLmsData(data, accessKey)
			.then((result) => {
				setResponse({ message: result.data.message, tone: "positive" });
			})
			.catch((err) => {
				setResponse({ message: err.response.data.message, tone: "negative" });
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<Card className="SubmitLmsDataWrapper">
			<SectionTitle>Submit LMS Data</SectionTitle>
			<Formik
				initialValues={{ depot: "", accessKey: "", file: "" }}
				onSubmit={onSubmit}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={lmsDataVal}
			>
				{({ isSubmitting, setFieldValue, errors, validateField }) => (
					<Form>
						<StatusMessage tone={response?.tone}>
							{response?.message}
						</StatusMessage>
						<Field
							type="file"
							name="file-upload"
							label=""
							fullWidth
							onChange={(e) => {
								onFileUpload(
									e.currentTarget.files[0],
									setFieldValue,
									validateField
								);
							}}
							component={FormField}
							inputProps={{ accept: ".csv" }}
							error={!!errors.file}
							helperText={errors.file ? "Invalid CSV file" : ""}
						/>
						<Field name="depot" component={DepotSelect} />
						<Field name="accessKey" component={FormField} />
						<FormButton
							type="submit"
							variant="contained"
							disabled={isSubmitting}
						>
							submit
						</FormButton>
					</Form>
				)}
			</Formik>
		</Card>
	);
};
export default SubmitLmsData;
