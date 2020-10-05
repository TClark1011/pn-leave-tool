import React from "react";

import SectionTitle from "./utility/SectionTitle";

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
			</div>
		);
	}
}

export default LeaveForm;
