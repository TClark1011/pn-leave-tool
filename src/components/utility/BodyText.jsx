import React from "react";

import { Typography } from "@material-ui/core";

function BodyText({ children, component, ...props }) {
	return (
		<Typography variant="body1" component={component || "p"} {...props}>
			{children}
		</Typography>
	);
}

export default BodyText;
