import Axios from "axios";
import React from "react";

import axios from "axios";

class LeaveList extends React.Component {
	constructor() {
		super();
		this.state = {
			leaveItems: [],
		};
	}

	componentDidMount() {
		axios
			.get("/api/leave", {
				user: this.props.user,
			})
			.then((result) => {
				console.log(result);
			});
	}

	render() {
		return <p>Leave data will go here</p>;
	}
}

export default LeaveList;
