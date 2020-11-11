import "./LeaveForm.scss";

import React, { useState } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import DateFnsUtils from "@date-io/date-fns";
import formatDate from "date-fns/format";

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
	addDays,
	startOfDay,
	differenceInDays,
	max as maxDate,
} from "date-fns";

import StatusMessage from "../utility/StatusMessage";
import SectionTitle from "../utility/SectionTitle";

function LeaveForm(props) {
	const minNoticeDays = 14;
	const minDate = startOfDay(addDays(new Date(), minNoticeDays));
	const [startDate, setStartDate] = useState(minDate);
	const [endDate, setEndDate] = useState(addDays(startDate, 1));
	const [response, setResponse] = useState(null);

	const lengthField = React.createRef();

	function updateStartDate(date) {
		setStartDate(startOfDay(date));
		const newEndDate = maxDate([endDate, addDays(date, 1)]);
		setEndDate(newEndDate);
		lengthField.current.value = differenceInDays(newEndDate, date) || 1;
	}
	function updateEndDate(date) {
		setEndDate(startOfDay(date));
		lengthField.current.value = differenceInDays(date, startDate) || 1;
	}

	function onSubmit(e) {
		var isValid = true;
		if (!startDate || !endDate || startDate >= endDate) {
			isValid = false;
		}
		if (isValid) {
			axios
				.post("/api/leave/request", {
					user: props.user,
					dates: { start: startDate, end: endDate },
				})
				.then((result) => {
					setResponse(result.data.message);
				})
				.catch((error) => {
					setResponse(formatDenied(error.response?.data));
				});
		}
	}

	function formatDenied(result) {
		return (
			<>
				{result.message}
				<ul className="invalid-days">
					{result.invalidDays.map((item, index) => (
						<li key={index}>{formatDate(new Date(item), "do MMMM yyyy")}</li>
					))}
				</ul>
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
		e.target.value = Math.max(0, parseInt(e.target.value))
			.toString()
			.slice(0, 3);
	}

	function onLengthFieldChange(e) {
		if (validateLengthField(e.target.value)) {
			updateEndDate(addDays(startDate, e.target.value));
		}
	}

	function lengthFieldFocusOut(e) {
		if (!validateLengthField(e.target.value)) {
			e.target.value = differenceInDays(endDate, startDate);
		}
	}

	/**
	 * Check whether or not the passed value would be a valid input into the leave length field
	 */
	function validateLengthField(value) {
		return value.length > 0 && value > 0;
	}

	return (
		<form className="leave-form">
			<SectionTitle>Submit Leave Request</SectionTitle>
			<BodyText>
				Enter the start and end dates for your annual leave then press 'Submit'
			</BodyText>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateField
					value={startDate}
					onChange={updateStartDate}
					minDate={startDate}
				></DateField>
				<BodyText className="date-field-divider form-item">To</BodyText>
				<DateField
					value={endDate}
					onChange={updateEndDate}
					minDate={addDays(startDate, 1)}
				></DateField>
			</MuiPickersUtilsProvider>
			<div className="form-item extra-data">
				<div className="length">
					<BodyText>Your leave is</BodyText>
					<TextField
						className="leave-length-field"
						onInput={limitLength}
						onChange={onLengthFieldChange}
						type="number"
						variant="outlined"
						inputRef={lengthField}
						onBlur={lengthFieldFocusOut}
						defaultValue="1"
					/>
					<BodyText>days long</BodyText>
				</div>
				<div className="remaining-leave">
					<BodyText>
						You have {props.user?.leave - differenceInDays(endDate, startDate)}{" "}
						days of leave remaining
					</BodyText>
				</div>
			</div>
			<Button
				variant="contained"
				color="primary"
				className="submit-button form-item"
				disableElevation
				onClick={onSubmit}
			>
				Submit
			</Button>
			<Modal open={response ? true : false}>
				<div className="inner-modal">
					<ClickAwayListener onClickAway={() => setResponse(null)}>
						<Card className="request-result-card">
							<StatusMessage tone={responseStatusTone()}>
								<BodyText>{response}</BodyText>
							</StatusMessage>
						</Card>
					</ClickAwayListener>
				</div>
			</Modal>
		</form>
	);

	function BodyText(props) {
		return (
			<Typography variant="body1" component="span" {...props}>
				{props.children}
			</Typography>
		);
	}

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
