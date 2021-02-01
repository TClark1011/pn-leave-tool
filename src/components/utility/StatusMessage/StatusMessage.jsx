import React from "react";

import { Link } from "@material-ui/core";
import { StatusMessageRoot } from "./StatusMessage.styles";
import { supportEmail } from "../../../constants/env";

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
			<StatusMessageRoot
				{...props}
				tone={tone}
				data-testid="StatusMessage__Root"
			>
				{children}
				{tone === "negative" && !hideSupportMsg && (
					<>
						<br />
						<br />
						You can contact us at{" "}
						<Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>
					</>
				)}
			</StatusMessageRoot>
		);
	} else {
		return "";
	}
}

export default StatusMessage;
