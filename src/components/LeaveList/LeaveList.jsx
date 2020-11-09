import "./LeaveList.scss";

import React from "react";

import axios from "axios";

import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";

import { format } from "date-fns";

import LabelledDivider from "../utility/LabelledDivider";

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

	console.log(status);
	//TODO: fetch full user data

	const dateFormat = "dd/MM/yyyy";

	function statusIconSwitch() {
		switch (status) {
			case 1:
				return <StatusIcon>check_circle</StatusIcon>;
				break;
			case -1:
				return <StatusIcon>cancel</StatusIcon>;
				break;
			default:
				return "?";
				break;
		}
	}

	function StatusIcon(props) {
		return <Icon className="status-icon">{props.children}</Icon>;
	}

	return (
		<Card className="leave-item">
			<div className="request-status" status={status}>
				{statusIconSwitch()}
			</div>
			<div className="body card-padding">
				<LeaveItemBodyRow>
					{format(new Date(dates.start), dateFormat)}
				</LeaveItemBodyRow>
				<LeaveItemBodyRow>
					<LabelledDivider label="to"></LabelledDivider>
				</LeaveItemBodyRow>
				<LeaveItemBodyRow>
					{format(new Date(dates.end), dateFormat)}
				</LeaveItemBodyRow>
			</div>
		</Card>
	);

	function LeaveItemBodyRow(props) {
		return (
			<div className="leave-item-body-row" {...props}>
				{props.children}
			</div>
		);
	}
}

export default LeaveList;
