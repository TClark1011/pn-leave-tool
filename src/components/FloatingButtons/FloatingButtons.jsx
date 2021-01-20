import "./FloatingButtons.scss";
import { Box } from "@material-ui/core";
import React from "react";
import HelpButton from "./HelpButton/HelpButton";
import ProfileButton from "./ProfileButton/ProfileButton";

function FloatingButtons({ ...props }) {
	return (
		<Box className="FloatingButtons__root">
			<HelpButton className="FloatingButtons__button" />
			<ProfileButton className="FloatingButtons__button" />
		</Box>
	);
}

export default FloatingButtons;
