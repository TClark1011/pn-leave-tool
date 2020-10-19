import "../styles/LeaveForm.scss";

import React from "react";

import moment from "moment";

import TextField from "@material-ui/core/TextField";

import SectionTitle from "./utility/SectionTitle";
import Calendar from "./DatePicker/Calendar";
import { Button } from "@material-ui/core";

class LeaveForm extends React.Component {
	constructor() {
		super();
		this.state = {
			startDate: null,
			endDate: null,
		};
	}

	setDates = (startDate, endDate) => {
		this.setState({ startDate, endDate });
	};

	//TODO: Show how many days long the requested leave is
	//TODO: Error if requested break goes past

	render() {
		function printDate(option) {
			//TODO: Replace with use of moment js format method
			if (option) {
				const day = moment(option).format("DD");
				const month = moment(option).format("MM");
				const year = moment(option).format("YYYY");
				return `${day}/${month}/${year}`;
			}
			return "";
		}
		return (
			<div className="leave-form container">
				<SectionTitle>Submit Request for Leave</SectionTitle>
				<Calendar date="2020-05-06" setDatesFn={this.setDates} />
				<div className="selected-dates-container">
					<TextField
						value={printDate(this.state.startDate)}
						className="selected-date-field"
						variant="outlined"
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						value={printDate(this.state.endDate)}
						className="selected-date-field"
						variant="outlined"
						InputProps={{
							readOnly: true,
						}}
					/>
				</div>
				<span>
					You have{" "}
					{this.props.user
						? this.props.user.storedLeave || -1
						: "[not signed in]"}{" "}
					days of leave remaining
				</span>
				<Button variant="contained" fullWidth color="primary" disableElevation>
					Submit
				</Button>
			</div>
		);
	}
}

export default LeaveForm;
