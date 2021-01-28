import "./StatusMessage.scss";

import React from "react";

import { Link } from "@material-ui/core";
import { StatusMessageRoot } from "./StatusMessage.styles";

function StatusMessage({
	hideSupportMsg = false,
	tone = "negative",
	className,
	border,
	children,
	...props
}) {
	if (children) {
		return (
			<StatusMessageRoot {...props} tone={tone}>
				{children}
				{tone === "negative" && !hideSupportMsg && (
					<>
						<br />
						<br />
						You can contact us at{" "}
						<Link href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>
							{process.env.REACT_APP_SUPPORT_EMAIL}
						</Link>
					</>
				)}
			</StatusMessageRoot>
		);
	} else {
		return "";
	}
}

export default StatusMessage;
