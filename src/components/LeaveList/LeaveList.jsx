import "./LeaveList.scss";

import React from "react";

import axios from "axios";

import Card from "@material-ui/core/Card";

import { format } from "date-fns";

class LeaveList extends React.Component {
	constructor() {
		super();
		this.state = {
			leaveItems: null,
		};
	}

	componentDidMount() {
		axios
			.get(`/api/leave/${this.props.user.employee_number}`, {
				headers: { token: "temp" },
			})
			.then((result) => {
				this.setState({ leaveItems: result.data.leaveItems });
			});
	}

	formatLeaveList() {
		const leaveItems = this.state.leaveItems;
		if (leaveItems) {
			if (leaveItems.length > 0) {
				const result = [];
				leaveItems.map((item) => {
					result.push(
						<LeaveItem key={item._id} {...item}>
							{item.dates.start}
						</LeaveItem>
					);
				});
				return result;
			} else {
				return <p>No leave found</p>;
				//TODO: Style this
			}
		} else {
			return <p>Loading...</p>;
			//TODO: Loading indicator
		}
	}

	render() {
		return <div>{this.formatLeaveList()}</div>;
	}
}

function LeaveItem(props) {
	const dates = props.dates;
	const status = props.status;
	const user = props.user;
	//TODO: fetch full user data

	const dateFormat = "dd/MM/yyyy";

	return (
		<Card className="leave-item">
			<p>
				{format(new Date(dates.start), dateFormat)} -{" "}
				{format(new Date(dates.end), dateFormat)}
			</p>
			<p>User: {user}</p>
			<p>Status: {status}</p>
		</Card>
	);
}

export default LeaveList;
