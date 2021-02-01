import { Link } from "@material-ui/core";
import React from "react";
import { supportEmail } from "../../constants/env";

function SupportEmailLink({ children, ...props }) {
	console.log("(SupportEmailLink) children: ", children);
	return (
		<Link href={`mailto:${supportEmail}`} {...props}>
			{children || supportEmail}
		</Link>
	);
}

export default SupportEmailLink;
