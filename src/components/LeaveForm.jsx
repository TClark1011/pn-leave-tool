import React from "react";

import SectionTitle from "./utility/SectionTitle";
import Calendar from "./DatePicker/Calendar"

class LeaveForm extends React.Component {
	constructor() {
		super();
		this.state = {
			startDate: null,
			endDate: null,
		};
	}

	render() {
		return (
			<div className="leave-form container">
				<SectionTitle>Submit Request for Leave</SectionTitle>
				<Calendar date="2020-05-06" />
			</div>
		);
	}
}

export default LeaveForm;
