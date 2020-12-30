import "./LeaveForm.scss";

import React, { useState, useContext } from "react";

import { submitLeave } from "../../services/leave";

import { Formik, Form, Field } from "formik";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import DateFnsUtils from "@date-io/date-fns";

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
	addDays,
	startOfDay,
	differenceInDays,
	format as formatDate,
	isValid as isValidDate,
	max as maxDate,
} from "date-fns";

import UserContext from "../utility/UserContext";

import leaveVal from "../../validation/leaveVal";

import StatusMessage from "../utility/StatusMessage";
import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import FormButton from "../utility/Forms/FormButton";

function LeaveForm(props) {
	const { user, setUser } = useContext(UserContext);

	const minNoticeDays = 14;
	const minDate = startOfDay(addDays(new Date(), minNoticeDays));
	const [startDate, setStartDate] = useState(minDate);
	const [endDate, setEndDate] = useState(addDays(startDate, 1));
	const [response, setResponse] = useState(null);

	function updateStartDate(date, string, setFieldValue) {
		if (isValidDate(date)) {
			const newStartDate = startOfDay(date);
			const newEndDate = maxDate([endDate, addDays(date, 1)]);
			setStartDate(newStartDate);
			setEndDate(newEndDate);
			if (setFieldValue) {
				setFieldValue("dates.start", newStartDate);
				setFieldValue("dates.end", newEndDate);
			}
			const newLength = differenceInDays(newEndDate, date) || 1;
			lengthFieldRef.current.value = newLength;
		}
	}
	function updateEndDate(date, string, setFieldValue) {
		if (isValidDate(date)) {
			const newEndDate = startOfDay(date);
			setEndDate(newEndDate);

			if (setFieldValue) {
				setFieldValue("dates.end", newEndDate);
			}

			const newLength = differenceInDays(date, startDate) || 1;

			lengthFieldRef.current.value = newLength;
		}
	}

	function onSubmit(data, { setSubmitting }) {
		console.log("(LeaveForm) onSubmit - data: ", data);
		setSubmitting(true);
		console.log("Submitting: ", data);
		submitLeave(data)
			.then((result) => {
				console.log("leave result: ", result);
				setResponse(result.data);
				setUser(result.data.updatedUser);
			})
			.catch((error) => {
				setResponse(
					error.response?.data || "There was an error, please try again later"
				);
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	function getMessage() {
		console.log("(LeaveForm) getMessage, response state: ", response);
		if (response) {
			if (response.approved) {
				return response.message;
			}
			return formatDenied(response);
		}
		return null;
	}

	function formatDenied(result) {
		return (
			<>
				{result.message}
				<ul className="invalid-days">
					{result.invalidDays?.map((item, index) => (
						<li key={index}>{formatDate(new Date(item), "MMMM do yyyy")}</li>
					))}
				</ul>
				<p className="try-again-msg">
					You can go back to select new dates and try again
				</p>
			</>
		);
	}

	/**
	 * Convert the boolean 'approved' value of the response to a string value accepted by the 'StatusMessage' component's 'tone' prop
	 */
	function responseStatusTone() {
		return response?.approved ? "positive" : "negative";
	}

	/**
	 * Limit the length of a 'number' typed input to 3 characters
	 * @param {Object} e - The 'onInput' event of the field
	 */
	function limitLength(e) {
		e.target.value = e.target.value.toString().slice(0, 3);
	}

	/**
	 * Check whether or not the passed value would be a valid input into the leave length field
	 */
	function validateLengthField(value, allowBlank) {
		allowBlank = allowBlank || false;
		return (value.length > 0 || allowBlank) && value > 0;
	}

	function onLengthFieldChange(e, setFieldValue) {
		const newValue = e.target.value;
		if (validateLengthField(newValue)) {
			const updatedLength = Math.max(1, newValue || 0);
			updateEndDate(addDays(startDate, updatedLength), setFieldValue);
		}
	}

	function lengthFieldFocusOut(e) {
		if (!validateLengthField(e.target.value)) {
			e.target.value = differenceInDays(endDate, startDate);
		}
	}
	const lengthFieldRef = React.createRef();
	return (
		<div className="leave-form">
			<SectionTitle>Submit Leave Request</SectionTitle>
			<Formik
				initialValues={{
					user: user.employee_number,
					dates: {
						start: minDate,
						end: addDays(minDate, 1),
					},
				}}
				onSubmit={onSubmit}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={leaveVal}
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form>
						<BodyText>
							Enter the start and end dates for your annual leave then press
							'Submit'
						</BodyText>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateField
								value={startDate}
								onChange={(value, string) => {
									updateStartDate(value, string, setFieldValue);
								}}
								minDate={startDate}
							/>
							<BodyText className="date-field-divider form-item">To</BodyText>
							<DateField
								value={endDate}
								onChange={(value, string) => {
									updateEndDate(value, string, setFieldValue);
								}}
								minDate={addDays(startDate, 1)}
							/>
						</MuiPickersUtilsProvider>
						<div className="form-item extra-data">
							<div className="length form-item">
								<BodyText component="span">Your leave is</BodyText>
								<TextField
									className="leave-length-field"
									onInput={limitLength}
									onChange={(e) => onLengthFieldChange(e, setFieldValue)}
									inputRef={lengthFieldRef}
									type="number"
									variant="outlined"
									onBlur={lengthFieldFocusOut}
									defaultValue="1"
								/>
								<BodyText component="span">days long</BodyText>
								{/* FIXME: Editin the length field does not adjust the end date*/}
							</div>
						</div>
						<Field name="user" type="hidden" value={user.employee_number} />
						<FormButton type="submit" disabled={isSubmitting}>
							submit
						</FormButton>
					</Form>
				)}
			</Formik>
			<Modal open={!!response}>
				<div className="inner-modal">
					<Card className="request-result-card">
						<StatusMessage tone={responseStatusTone()}>
							{getMessage()}
						</StatusMessage>
						<Button
							variant="outlined"
							className="return-button"
							onClick={() => setResponse(null)}
						>
							return
						</Button>
					</Card>
				</div>
			</Modal>
		</div>
	);

	function DateField(props) {
		return (
			<KeyboardDatePicker
				autoOk
				inputVariant="outlined"
				format="dd/MM/yyyy"
				className="date-field form-item"
				disablePast
				{...props}
			></KeyboardDatePicker>
		);
	}
}

export default LeaveForm;
