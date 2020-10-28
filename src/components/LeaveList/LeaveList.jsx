import React from "react";

import axios from "axios";

import Card from "@material-ui/core/Card";

import australianDate from "../../services/australianDate";

class LeaveList extends React.Component {
	constructor() {
		super();
		this.state = {
			leaveItems: [],
		};
	}

	componentDidMount() {
		axios
			.get(`/api/leave/${1}`, {
				headers: { token: "temp" },
			})
			.then((result) => {
				console.log(result.data.leaveItems);
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
						<LeaveItem key={item._id} dates={item.dates}>
							{item.dates.start}
						</LeaveItem>
					);
				});
				return result;
			} else {
				return <p>No leave found</p>;
			}
		} else {
			return <p>Loading...</p>;
		}
	}

	render() {
		return <div>{this.formatLeaveList()}</div>;
	}
}

function LeaveItem(props) {
	const dates = props.dates;

	return (
		<Card>
			<p>
				{australianDate(dates.start)} - {australianDate(dates.end)}
			</p>
		</Card>
	);
}

export default LeaveList;
