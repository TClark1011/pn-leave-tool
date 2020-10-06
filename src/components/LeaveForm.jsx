import React from "react";

import moment from "moment";

import SectionTitle from "./utility/SectionTitle";

function Calendar(props) {
	const date = moment(props.date);
	const firstDayOffset = moment(date).startOf("month").day()-1;
    const lastDay = moment(date).endOf("month").date();

    const containerStyle = {
        borderCollapse:"collapse"
    }
    
    const dayStyle = {
        width:80,
        height:80,
        textAlign:"center",
        borderCollapse:"collapse",
        border:"1px solid black"
    }

    const rows = [];
    var currDay = 1 - firstDayOffset;
	for (let i = 0; i < lastDay / 7; i++) {
        const days = []
        for (let i = 1; i < 8; i++) {
            if (currDay > 0) {
                days.push(<td key={i} className="calendar-day" style={dayStyle}>{currDay}</td>)
            } else {
                days.push(<td key={i} className="calendar-emptyDay calendar-day" style={dayStyle}></td>)
            }
            currDay++
        }
		rows.push(
			<tr key={i} className="calendar-week">
				{days}
			</tr>
		);
	}
	return (
		<table className="calendar-container" style={containerStyle}>
			<tbody>{rows}</tbody>
		</table>
	);
}

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
