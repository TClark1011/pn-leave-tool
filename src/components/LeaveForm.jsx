import "../styles/LeaveForm.scss";

import React, { useState, useEffect } from "react";

import moment from "moment";
import axios from "axios";

import { Button, TextField } from "@material-ui/core";

import SectionTitle from "./utility/SectionTitle";
import ErrorMessage from "./utility/ErrorMessage";
import Calendar from "./DatePicker/Calendar";

class LeaveForm extends React.Component {
	constructor() {
		super();
		this.state = {
			userSelected: {
				start: null,
				end: null,
			},
			//TODO: Refactor all instances of user selection to use to the terms 'start' and 'end'
		};
	}

	/**
	 * Sets the start and end date state items
	 * @param {Moment} startDate - The starting date of the user's selection
	 * @param {Moment} endDate   - The ending date of the user's selection
	 */
	setDates = (startDate, endDate) => {
		this.setState({ userSelected: { start: startDate, end: endDate } });
	};

	//TODO: Show how many days long the requested leave is
	//TODO: Error if requested break goes past

	render() {
		return (
			<div className="leave-form container">
				<SectionTitle>Submit Request for Leave</SectionTitle>
				<Calendar date="2020-05-06" setDatesFn={this.setDates} />
				<InfoForm
					start={this.state.userSelected.start}
					end={this.state.userSelected.end}
					user={this.props.user}
				/>
			</div>
		);
	}
}

function InfoForm(props) {
	const [formError, setFormError] = useState(null);
	const storedLeave = props.user ? props.user.storedLeave || -1 : -2;
	const [remainingLeave, setRemainingLeave] = useState(storedLeave);

	function submitHandler() {
		//# Validation
		if (!(props.start && props.end)) {
			//? If either the start or end date has not been selected
			setFormError("You must select a start and end date");
		} else {
			//? Form data is valid
			setFormError(null);

			//# Axios code
			axios
				.post("/api/leave", {
					user: props.user,
					request: {
						dates: { start: props.start.toDate(), end: props.end.toDate() },
					},
				})
				.then((response) => {
					console.log(response);
				});
		}
	}

	useEffect(() => {
		if (moment.isMoment(props.start) && moment.isMoment(props.end)) {
			const newLeaveValue = Math.max(
				0,
				storedLeave - props.end.diff(props.start, "days") - 1
			);
			setRemainingLeave(newLeaveValue);
		}
	});

	return (
		<form>
			<ErrorMessage>{formError}</ErrorMessage>
			<div className="selected-dates-container">
				<TextField
					value={props.start ? props.start.format("DD/MM/YYYY") : " "}
					className="selected-date-field"
					variant="outlined"
					InputProps={{
						readOnly: true,
					}}
					name="start_date"
				/>
				<TextField
					value={props.end ? props.end.format("DD/MM/YYYY") : " "}
					className="selected-date-field"
					variant="outlined"
					InputProps={{
						readOnly: true,
					}}
					name="end_date"
				/>
			</div>
			<span>You have {remainingLeave} days of leave remaining</span>
			{/* TODO: Style this, add warning indication if stored leave has been exceeded */}
			<Button
				variant="contained"
				fullWidth
				color="primary"
				disableElevation
				onClick={submitHandler}
			>
				Submit
			</Button>
		</form>
	);
}

export default LeaveForm;
