import React, { useEffect, useState } from "react";

import csv2json from "csvjson-csv2json";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
} from "@material-ui/core";

import { submitLmsData } from "../../../services/admin";
import DepotSelect from "../../DepotSelect/DepotSelect";
import { Field, Form, Formik } from "formik";
import FormField from "../../utility/Forms/FormField";
import FormButton from "../../utility/Forms/FormButton";
import StatusMessage from "../../utility/StatusMessage";
import SectionTitle from "../../utility/SectionTitle";

import { lmsDataValFrontend } from "pn-leave-tool-common";
import { getDepots } from "../../../services/depots";
import findObjectInArray from "../../../utils/findObjectInArray";
import ContentCard from "../../utility/ContentCard";

const SubmitLmsData = (props) => {
	const [depots, setDepots] = useState(null);
	useEffect(() => {
		getDepots()
			.then((result) => {
				setDepots(result);
			})
			.catch((err) => setDepots("error"));
	}, []);
	const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
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
		submitLmsData({ file: data.file, depot: data.depot }, data.access_key)
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

	function preSubmit(validateForm) {
		validateForm().then((errors) => {
			if (!Object.keys(errors).length) {
				setConfirmationIsOpen(true);
			}
		});
	}

	const ConfirmationDialog = ({ submitForm, depot, ...props }) => (
		<Dialog open={confirmationIsOpen && depots && depots !== "error"}>
			<DialogTitle>Confirm Submission</DialogTitle>
			<DialogContent>
				Are you sure you want to submit roster data for the{" "}
				<b>
					{depots &&
						depots !== "error" &&
						findObjectInArray(depots, { _id: depot })?.name}
				</b>{" "}
				depot?
			</DialogContent>
			<DialogActions>
				<Grid justify="space-around" container>
					<Button
						onClick={() => {
							submitForm();
							setConfirmationIsOpen(false);
						}}
					>
						yes
					</Button>
					<Button onClick={() => setConfirmationIsOpen(false)}>no</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);

	return (
		<ContentCard>
			<SectionTitle>Submit LMS Data</SectionTitle>
			<Formik
				initialValues={{
					depot: "",
					access_key: "",
					file_input: null,
					file: null,
				}}
				onSubmit={onSubmit}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={lmsDataValFrontend}
			>
				{({
					isSubmitting,
					submitForm,
					setFieldValue,
					errors,
					validateField,
					validateForm,
					values,
				}) => (
					<Form>
						<StatusMessage tone={response?.tone}>
							{response?.message}
						</StatusMessage>
						<Field type="hidden" name="file" />
						<Field
							type="file"
							name="file_input"
							label=""
							fullWidth
							onChange={(e) => {
								onFileUpload(
									e.currentTarget.files[0],
									setFieldValue,
									validateField,
								);
							}}
							component={FormField}
							inputProps={{ accept: ".csv" }}
							error={!!errors.file}
							helperText={errors.file ? "Invalid CSV file" : ""}
						/>
						<Field name="depot" component={DepotSelect} />
						<Field name="access_key" component={FormField} />
						<FormButton
							disabled={isSubmitting}
							variant="contained"
							onClick={() => preSubmit(validateForm)}
						>
							submit
						</FormButton>
						<ConfirmationDialog depot={values.depot} submitForm={submitForm} />
					</Form>
				)}
			</Formik>
		</ContentCard>
	);
};
export default SubmitLmsData;
