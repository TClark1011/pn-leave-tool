import React from "react";

class Day extends React.Component {
	class() {
		//# Generate the className of the day
		return "calendar-day " + this.props.date > 0 ? "" : "calendar-emptyDay";
	}

	number() {
		return this.props.date > 0 ? this.props.date : "";
	}

	style = {
		width: this.props.size || 50,
        height: this.props.size || 50,
        textAlign:"center",
        border:"1px solid black"
	};

	render() {
		return (
			<td className={this.class()} style={this.style}>
				{this.number()}
			</td>
		);
	}
}

export default Day;
