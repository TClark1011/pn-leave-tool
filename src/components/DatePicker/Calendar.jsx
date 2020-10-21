import React from "react";

import moment from "moment";

import Day from "./Day";

class Calendar extends React.Component {
	constructor(props) {
		super();
		this.state = {
			date: props.date || moment(),
			userHovering: null,
			userSelect: { first: null, second: null },
		};
		this.lastDay = moment(this.state.date).endOf("month").date();
		this.firstDayOffset = moment(this.state.date).startOf("month").day() - 1;
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
		 * First is selected but second is not, new selection is before first:See above
		 * //TODO: Select an already selected number: Deselect it
		 */

		if (!this.state.userSelect.first) {
			//# if first has not been selected (which would also mean the second has not been selected)
			this.setState({
				userSelect: { ...this.state.userSelect, first: number },
			});
			this.props.setDatesFn(number, this.state.userSelect.second);
		} else if (number > this.state.userSelect.first) {
			//# First is selected and new comes after
			this.setState({
				userSelect: { ...this.state.userSelect, second: number },
			});
			this.props.setDatesFn(this.state.userSelect.first, number);
		} else if (
			number < this.state.userSelect.first &&
			!this.state.userSelect.second
		) {
			this.setState({
				userSelect: { second: this.state.userSelect.first, first: number },
			});
			this.props.setDatesFn(number, this.state.userSelect.first);
		} else if (number < this.state.userSelect.first) {
			//# First is selected and new comes before
			this.setState({
				userSelect: { ...this.state.userSelect, first: number },
			});
			this.props.setDatesFn(number, this.state.userSelect.second);
		}
		//TODO: When clicking in the middle, have the date that is closer to the cursor move
		//TODO: Clear button
	};

	content() {
		//# Iterates through dates to be displayed on calendar and builds the content of the component
		var currDay = 2 - this.firstDayOffset;
		const rows = [];
		for (let i = 0; i < this.lastDay / 7; i++) {
			//# Iterate through each week of month
			const days = [];
			for (let x = 0; x < 7; x++) {
				//# Iterate through each week of day
				const adjustedDate =
					currDay <= 0 || currDay > this.lastDay
						? 0
						: moment(this.date).date(currDay);
				days.push(
					<Day
						key={currDay}
						date={adjustedDate}
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

	//TODO: Ability to switch months
	//TODO: Weekday headers
	//TODO: Don't allow selection of past dates
	//FIXME: IE OVERLAY POSITIONS ARE BROKEN (LIKELY CAUSED BY FLEX/ALIGN ITEMS/HEIGHT)
	render() {
		return (
			<div className="datepicker-calendar">
				<table className="calendar-container" style={this.style}>
					<tbody>{this.content()}</tbody>
				</table>
			</div>
		);
	}
}

export default Calendar;
