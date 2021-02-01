import { Link } from "@material-ui/core";
import React from "react";
import { supportEmail } from "../../constants/env";

/**
 * A link to the support email
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @returns {ReactNode} The component's rendered elements
 */
const SupportEmailLink = ({ children, ...props }) => {
	return (
		<Link href={`mailto:${supportEmail}`} {...props}>
			{children || supportEmail}
		</Link>
	);
};

export default SupportEmailLink;
