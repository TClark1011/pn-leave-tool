import React from "react";

import moment from "moment";

class Day extends React.Component {
	constructor(props) {
		super();
		this.probability = props.probability || Math.floor(Math.random() * 10) + 1;
		//* probability represents the chance of receiving leave on a given date
		//DEPLOYMENT: Random generation is just for testing
		this.size = props.size | 50;
		this.maxDate = props.maxDate || 31;
		this.date = props.date;
		this.empty = !(this.date && moment(this.date).date() <= this.maxDate);
		this.cellRef = React.createRef();

		this.cellSizeStyle = {
			width: this.size,
			height: this.size,
		};
		this.probColourStyle = {
			backgroundColor: this.empty
				? ""
				: `rgba(242,169,0,${this.probability / 10})`,
		};
		//* 'probabilityColourStyle' => sets the background colour according too the probability property

		this.state = {
			style: this.empty ? {} : this.style,
			selected: false,
			userHovering: null,
		};
	}

	componentDidUpdate() {
		//# Check if 'selected' status needs to be changed when component updates
		const isFirstSelection = this.props.selectedDays.first === this.date;
		const isSecondSelection = this.props.selectedDays.second === this.date;
		if (!this.state.selected) {
			//# If item was not previously selected but now should be
			if (isFirstSelection) {
				this.setState({ selected: "first" });
			}
			if (isSecondSelection) {
				this.setState({ selected: "second" });
			}
		}
		if (this.state.selected && !(isFirstSelection || isSecondSelection)) {
			//# If item was previously selected but now no longer should be
			this.setState({ selected: false });
		}
		if (
			this.props.selectedDays.first &&
			this.props.selectedDays.second &&
			this.date > this.props.selectedDays.first &&
			this.date < this.props.selectedDays.second
		) {
			this.cellRef.current.classList.add("calendar-day-inside-selection");
			//? Adding a class to a reference but updating state exceeds max depth and crashes the app
		} else {
			this.cellRef.current.classList.remove("calendar-day-inside-selection");
		}
	}

	//TODO: Set up test data to feed varying probability values into calendar

	class() {
		//# Generate the className of the day
		var result = "calendar-day-cell ";
		result += this.state.selected
			? `calendar-day-selected calendar-day-${this.state.selected}-selection`
			: "";
		result += this.empty ? "calendar-emptyDay" : "";
		return result;
	}

	number() {
		//# Get the number of the date, return blank if it is outside of bounds
		return !this.empty ? moment(this.date).date() : "";
	}
	select() {
		//# Push current instance into user selection
		this.props.selectFn(this.date);
		//FIXME: If none are selected and then you select a day, then select a day behind that, the selection indicator on the first day is facing backwards. This is because the first selected day is set to "first" selected but is not updated to second once the one behind it is selected
	}

	//TODO: Style user selection (both selected dates and the dates inbetween)
	//TODO: Refactor class names (label the hover element with hover, the inner square, etc.)
	//TODO: Add transitions to user selection (should probably just bite the bullet and style in an external css file)
	//TODO: Don't have selections be shaped while there is only a single selection
	// render() {
	// 	return (
	// 		<td
	// 			className={this.class()}
	// 			style={this.cellSizeStyle}
	// 			onClick={() => this.select()}
	// 			ref={this.cellRef}
	// 		>
	// 			<div className="calendar-day-inner-wrapper">
	// 				{/* 'inner-wrapper' is the hover target */}
	// 				<span
	// 					className="calendar-day-number-wrapper"
	// 					style={this.probColourStyle}
	// 				>
	// 					{/* 'number-wrapper' is the heatmap coloured element */}
	// 					<span className="calendar-day-number">{this.number()}</span>
	// 				</span>
	// 			</div>
	// 		</td>
	// 	);
	// }

	render() {
		return (
			<td
				className={this.class()}
				style={this.cellSizeStyle}
				onClick={() => this.select()}
				ref={this.cellRef}
			>
				{/* this cell remains square and will contain no hover or selection logic */}
				<div className="flex-wrapper">
					<span className="day-number">{this.number()}</span>
					<div className="overlay-target-outer-wrapper flex">
						<div className="overlay-target-inner-wrapper">
							<div className="overlay-target selection"></div>
							<div className="overlay-target hover"></div>
						</div>
					</div>
				</div>
			</td>
		);
	}
}

export default Day;
