import { Fab, Typography } from "@material-ui/core";

import React from "react";
import { Link } from "react-router-dom";

/**
 * Help Floating Button. Links to the help page.
 *
 * @param {object} props component props
 * @returns {ReactNode} The help button. Does not appear
 * if user is already on the help screen.
 */
const HelpButton = (props) => {
	return (
		<Fab color="primary" component={Link} to="/help" {...props}>
			<Typography style={{ fontSize: 28 }}>?</Typography>
		</Fab>
	);
};

export default HelpButton;
