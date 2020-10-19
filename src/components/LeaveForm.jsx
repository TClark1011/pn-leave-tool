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
		this.setState({ userSelected: { startDate, endDate } });
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
						value={printDate(this.state.userSelected.start)}
						className="selected-date-field"
						variant="outlined"
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						value={printDate(this.state.userSelected.start)}
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
