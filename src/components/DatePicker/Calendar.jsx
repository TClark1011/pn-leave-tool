import React from "react";

import moment from "moment";

import Day from "./Day";

class Calendar extends React.Component {
	constructor(props) {
		super();
		const date = moment(props.date) || moment();
		this.state = {
			date: date,
		};
		this.lastDay = moment(date).endOf("month").date();
		this.firstDayOffset = moment(date).startOf("month").day() - 1;
    }
    
    style = {
        borderCollapse:"collapse"
    }

	content() {
        //# Iterates through dates to be displayed on calendar and builds the content of the component
		var currDay = 2 - this.firstDayOffset;
		const rows = [];
		for (let i = 0; i < this.lastDay / 7; i++) { //# Iterate through each week of month
			const days = [];
			for (let x = 0; x < 7; x++) { //# Iterate through each week of day
				days.push(<Day key={x} date={currDay} />)
				currDay++;
			}
			rows.push(
				<tr key={i} className="calendar-week">
					{days}
				</tr>
			);
        }
        return rows
	}

	render() {
		return <table className="calendar-container" style={this.style}><tbody>{this.content()}</tbody></table>;
	}
}

export default Calendar;
