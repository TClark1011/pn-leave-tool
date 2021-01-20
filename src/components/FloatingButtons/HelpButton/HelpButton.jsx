import { Fab, Typography } from "@material-ui/core";

import React from "react";
import { Link } from "react-router-dom";

const HelpButton = (props) => {
	return (
		<Fab
			className="FloatingHelpButton"
			color="primary"
			component={Link}
			to={"/help"}
			{...props}
		>
			<Typography style={{ fontSize: 32 }}>?</Typography>
		</Fab>
	);
};

export default HelpButton;
