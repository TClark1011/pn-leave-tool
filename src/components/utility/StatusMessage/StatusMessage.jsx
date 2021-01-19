import "./StatusMessage.scss";

import React from "react";

import classnames from "classnames";
import { Box, Link } from "@material-ui/core";
import BodyText from "../BodyText";

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
			<Box className={classes} {...props}>
				{children}
				{tone === "negative" && (
					<>
						<br />
						<br />
						You can contact us at{" "}
						<Link href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>
							{process.env.REACT_APP_SUPPORT_EMAIL}
						</Link>
					</>
				)}
			</Box>
		);
	} else {
		return "";
	}
}

export default StatusMessage;
