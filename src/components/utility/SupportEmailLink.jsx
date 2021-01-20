import { Link } from "@material-ui/core";
import React from "react";

function SupportEmailLink({ children, ...props }) {
	console.log("(SupportEmailLink) children: ", children);
	return (
		<Link href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`} {...props}>
			{children || process.env.REACT_APP_SUPPORT_EMAIL}
		</Link>
	);
}

export default SupportEmailLink;
