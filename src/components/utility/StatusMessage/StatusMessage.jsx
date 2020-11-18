import "./StatusMessage.scss";

import React from "react";

import classnames from "classnames";

function StatusMessage(props) {
	const classes = classnames(
		"error-message",
		props.tone || "negative",
		{ border: props.border !== "none" },
		{ [`border-${props.border || "left"}`]: props.border !== "none" },
		props.className
	);

	if (props.children) {
		return <div className={classes}>{props.children}</div>;
	} else {
		return "";
	}
}

export default StatusMessage;
