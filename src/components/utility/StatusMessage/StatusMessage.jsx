import "./StatusMessage.scss";

import React from "react";

import classnames from "classnames";

function StatusMessage({ tone, className, border, children, ...props }) {
	const classes = classnames(
		"status-message",
		tone || "negative",
		{ border: border !== "none" },
		{ [`border-${border || "left"}`]: border !== "none" },
		className,
	);

	if (children) {
		return (
			<div className={classes} {...props}>
				{children}
			</div>
		);
	} else {
		return "";
	}
}

export default StatusMessage;
