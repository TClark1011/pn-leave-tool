import "./StatusMessage.scss";

import React from "react";

import classnames from "classnames";

function StatusMessage(props) {
	const classes = classnames(
		"error-message",
		props.tone || "negative",
		{ border: props.border !== "none" },
		{ [`border-${props.border || "left"}`]: props.border !== "none" }
	);

	if (props.children) {
		return <div className={classes}>{props.children}</div>;
	} else {
		return "";
	}
}

//TODO: Change to status message and take tone prop, accepting values 'positive', 'negative' or 'warning' which change the colour of the message

export default StatusMessage;
