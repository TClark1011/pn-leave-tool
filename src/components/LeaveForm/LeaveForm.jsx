import "./LeaveForm.scss";

import React, { useState, useEffect } from "react";

import moment from "moment";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";

import SectionTitle from "../utility/SectionTitle/SectionTitle";
import ErrorMessage from "../utility/ErrorMessage/ErrorMessage";
import Calendar from "../DatePicker/Calendar";

import australianDate from "../../services/australianDate";

class LeaveForm extends React.Component {
	constructor() {
		super();
		this.state = {
			userSelected: {
				start: null,
				end: null,
			},
			showResult: false,
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
	//TODO: Error if requested break exceeds stored leave days

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
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState(null);

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
				.post("/api/leave/request", {
					user: props.user,
					dates: { start: props.start.toDate(), end: props.end.toDate() },
				})
				.then((response) => {
					console.log(response);
					setResult(response.data);
					setShowResult(true);
				})
				.catch((error) => {
					console.log(error.response.data);
					setShowResult(true);
					setResult(error.response.data);
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

	function resultMsg() {
		if (result) {
			if (result.approved) {
				return "Your request for annual leave was approved";
			} else {
				const badDays = result.invalidDays.map((item) => {
					return <li key={item}>{australianDate(item)}</li>;
				});
				return (
					<ErrorMessage>
						<p className="summary">Your request for annual leave was denied.</p>
						<p className="justification">
							The following dates are currently unavailable for annual leave due
							to roster shortages:
						</p>
						<ul className="bad-days">{badDays}</ul>
					</ErrorMessage>
				);
			}
		}
		return "fallback result message";
	}

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
			<Modal open={showResult}>
				<div className="flexbox">
					<Card className="request-result container">{resultMsg()}</Card>
				</div>
			</Modal>
		</form>
	);
	//TODO: Loading indicator while waiting for result
	//TODO: Require sign on to see this page
}

export default LeaveForm;
