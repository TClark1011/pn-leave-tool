import "./LeaveForm.scss";

import React, { useState } from "react";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { addDays, startOfDay, format, parse } from "date-fns";

import StatusMessage from "../utility/StatusMessage";

function LeaveForm(props) {
	const [startDate, setStartDate] = useState(startOfDay(new Date()));
	const [endDate, setEndDate] = useState(startOfDay(addDays(new Date(), 1)));
	const [response, setResponse] = useState(null);

	const dateFormat = "dd/MM/yyyy";

	function updateStartDate(date) {
		setStartDate(startOfDay(date));
	}
	function updateEndDate(date) {
		setEndDate(startOfDay(date));
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
					console.log(result);
					setResponse(result.data);
				})
				.catch((error) => {
					console.log(error);
					setResponse(error.response.data);
				});
		}
	}

	function responseStatusTone() {
		return response?.approved ? "positive" : "negative";
	}

	return (
		<div className="leave-form">
			<div className="datepickers-wrapper">
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<div className="calendar-wrapper">
						<Calendar value={startDate} onChange={updateStartDate} />
						<DateField value={format(startDate, dateFormat)} />
					</div>
					<div className="calendar-wrapper">
						<Calendar
							value={endDate}
							onChange={updateEndDate}
							minDate={addDays(startDate, 1)}
						/>
						<DateField value={format(endDate, dateFormat)} />
					</div>
				</MuiPickersUtilsProvider>
			</div>
			<Button
				variant="contained"
				color="primary"
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
								{response?.message}
							</StatusMessage>
						</Card>
					</ClickAwayListener>
				</div>
			</Modal>
		</div>
	);

	function Calendar(props) {
		return (
			<DatePicker
				disablePast="true"
				autoOk
				variant="static"
				openTo="date"
				className="calendar"
				{...props}
			/>
		);
	}

	function DateField(props) {
		return (
			<TextField
				className="date-field"
				variant="outlined"
				readOnly
				{...props}
			></TextField>
		);
	}
}

export default LeaveForm;
