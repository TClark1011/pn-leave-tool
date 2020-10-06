import React from "react";

class Day extends React.Component {
	constructor(props) {
		super();
		this.heat = props.heat || 1; //* Heat represents the chance of being denied for leave on a given date
        this.size = props.size | 50;
        this.maxDate = props.maxDate || 31;
        this.date = props.date;

		this.style = {
			width: this.size,
			height: this.size,
			textAlign: "center",
			backgroundColor: `rgba(255,0,0,${this.heat / 20})`,
			boxSizing: "border-box",
            fontWeight: 600,
            cursor:"pointer",
		};

		this.hoverStyle = {
			backgroundColor: `rgba(255,0,0,${this.heat / 10})`,
        };

		this.state = {
			style: this.style,
			hoverStyle: {},
            selected: (props.selectedDays.first === this.date || props.selectedDays.second === this.date ),
            userHovering: null
        };
    }

    componentDidUpdate() { //# Check if 'selected' status needs to be changed when component updates
        const isFirstSelection = (this.props.selectedDays.first === this.date);
        const isSecondSelection = (this.props.selectedDays.second === this.date);
        if (!this.state.selected && (isFirstSelection || isSecondSelection)) {
            //# If item was not previously selected but now should be
            this.setState({selected:true})
            return 0
        }
        if(this.state.selected && !(isFirstSelection || isSecondSelection)) {
            //# If item was previously selected but now no longer should be
            this.setState({selected:false})
        }
        
    }

    //TODO: Refactor style objects to include an inner object
    
    //TODO: Set up test data to feed varying heat values into calendar

	turnHoverOn() { //# Toggles the hover state on and updates what date the user is currently hovering
        this.setState({ hoverStyle: this.hoverStyle });
        this.props.setUserHovering(this.date);
	}
	turnHoverOff() { //# Toggles the hover state off and updates what date the user is currently hovering
        this.setState({ hoverStyle: {} });
        this.props.setUserHovering(null);
    }
    //TODO: Consider only setting 'userHovering' to 'null' if the cursor exits the calendar entirely, or if it enters an empty day cell
    //TODO: Disable hover for empty days

	class() {
		//# Generate the className of the day
		return "calendar-day " + (this.date > 0) && (this.date <= this.maxDate) ? "" : "calendar-emptyDay";
	}

	number() {
        //# Get the number of the date, return blank if it is outside of bounds
		return (this.date) > 0  && (this.date <= this.maxDate) ? this.date : "";
    }
    //TODO: Refactor with a function that checks if the date is valid (above 0 and less than negative) rather than repeating the conditional

    select() {
        //# Push current instance into user selection
        this.props.selectFn(this.date);
    }

    //TODO: Style user selection (both selected dates and the dates inbetween)
    //TODO: Add transitions to user selection (should probably just bite the bullet and style in an external css file)

	render() {
		return (
			<td
				className={this.class()}
				style={this.state.style}
				onMouseEnter={() => this.turnHoverOn()}
				onMouseLeave={() => this.turnHoverOff()}
                onClick={() => this.select()}
			>
				<span
					className="calendar-day-number-wrapper"
					style={{
						display: "flex",
						width: "100%",
						height: "100%",
                        borderRadius:50,
                        backgroundColor:this.state.selected ? "yellow" : "",
						...this.state.hoverStyle,
					}}
				>
					<span style={{margin:"auto"}} className="calendar-day-number">{this.number()}</span>
				</span>
			</td>
		);
	}
}

export default Day;
