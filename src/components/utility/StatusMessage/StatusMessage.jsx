import React from "react";

import { Link } from "@material-ui/core";
import { StatusMessageRoot } from "./StatusMessage.styles";
import { supportEmail } from "../../../constants/env";
import BodyText from "../BodyText";

/**
 * Component for displaying short positive/neutral/negative messages
 * Intended to be used to display server responses.
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The message contents
 * @param {boolean} [props.hideSupportMsg=false] Whether or not to
 * hide a message indicating users can contact the support email.
 * @param {string} [tone="negative"] The tone of the status message.
 * Must be either "negative", "positive" or "neutral".
 * @returns {ReactNode} The component's rendered elements
 */
const StatusMessage = ({
	hideSupportMsg = false,
	tone = "negative",
	children,
	...props
}) => {
	if (children) {
		return (
			<StatusMessageRoot
				{...props}
				tone={tone}
				data-testid="StatusMessage__Root"
			>
				<BodyText>
					{children}
					{tone === "negative" && !hideSupportMsg && (
						<>
							<br />
							<br />
							You can contact us at{" "}
							<Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>
						</>
					)}
				</BodyText>
			</StatusMessageRoot>
		);
	} else {
		return "";
	}
};

export default StatusMessage;
