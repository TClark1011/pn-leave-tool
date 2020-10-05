import React from "react";

class ErrorMessage extends React.Component {
	containerStyle = {
        display:"inline-block",
		border: "2px solid #e57373",
		borderRadius: 4,
        backgroundColor: "#ffcdd2",
        margin:"auto",
		marginBottom: 12,
		padding: 8,
		color: "#c62828",
        fontWeight: 600,
        maxWidth:"90%"
	};

	render() {
		if (this.props.children) {
			return (
				<div className="error-message-wrapper" style={{display:"flex"}}>
					<div className="error-message" style={this.containerStyle}>
						{this.props.children}
					</div>
				</div>
			);
		} else {
			return "";
		}
	}
}

export default ErrorMessage;
