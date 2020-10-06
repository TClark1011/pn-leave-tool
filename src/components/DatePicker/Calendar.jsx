import React from "react";

import moment from "moment";

import Day from "./Day";

class Calendar extends React.Component {
	constructor(props) {
		super();
		const date = moment(props.date) || moment();
		this.state = {
			date: date,
			userHovering: null,
			userSelect: { first: null, second: null },
		};
		this.lastDay = moment(date).endOf("month").date();
		this.firstDayOffset = moment(date).startOf("month").day() - 1;
	}

	style = {
		borderCollapse: "collapse",
	};

	setUserHovering = (number) => {
		this.setState({ userHovering: number });
	};

	setUserSelect = (number) => {
		//# Update user selection
		/**
		 * Situations:
		 * Neither are selected: Put new selection into first
		 * First is selected, and new selection comes after first: Put new selection in second
		 * First is selected but new selection comes before first: Move first to second and new selection into first
		 * //TODO: Select an already selected number: Deselect it
		 */

		if (!this.state.userSelect.first) {
            //# if first has not been selected (which would also mean the second has not been selected)
            console.log("There were no prior selections");
			this.setState({userSelect:{ ...this.state.userSelect, first: number }});
		} else if (number > this.state.userSelect.first) {
            //# First is selected and new comes after
            console.log("New selection is after first");
			this.setState({userSelect:{ ...this.state.userSelect, second: number }});
		} else if (number <= this.state.userSelect.first) {
            //# First is selected and new comes before
            console.log("new selection is before first");
			this.setState({userSelect:{...this.state.userSelect, first: number }});
		} else {
			console.log("unexpected selection scenario");
		}
	};

    //TODO: Add range selection

	content() {
        //# Iterates through dates to be displayed on calendar and builds the content of the component
		var currDay = 2 - this.firstDayOffset;
		const rows = [];
		for (let i = 0; i < this.lastDay / 7; i++) {
			//# Iterate through each week of month
			const days = [];
			for (let x = 0; x < 7; x++) {
				//# Iterate through each week of day
				days.push(
					<Day
						key={currDay}
						date={currDay}
						userHovering={this.state.userHovering}
						setUserHovering={this.setUserHovering}
						maxDate={this.lastDay}
						selectFn={this.setUserSelect}
                        selectedDays={this.state.userSelect}
					/>
				);
				currDay++;
			}
			rows.push(
				<tr key={i} className="calendar-week">
					{days}
				</tr>
			);
		}
		return rows;
	}

	render() {
		return (
			<table className="calendar-container" style={this.style}>
				<tbody>{this.content()}</tbody>
			</table>
		);
	}
}

export default Calendar;
