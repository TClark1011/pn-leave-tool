import "./ErrorMessage.scss";

import React from "react";

function ErrorMessage(props) {
	const containerStyle = {
		display: "inline-block",
		border: "2px solid #e57373",
		borderRadius: 4,
		backgroundColor: "#ffcdd2",
		margin: "auto",
		padding: 8,
		color: "#c62828",
		fontWeight: 600,
		maxWidth: "90%",
	};

	function classes() {
		var result = "error-message";
		const border = props.border || "left";
		result += border !== "none" ? ` border border-${border}` : "";
		return result;
	}

	if (props.children) {
		return <div className={classes()}>{props.children}</div>;
	} else {
		return "";
	}
}

export default ErrorMessage;
