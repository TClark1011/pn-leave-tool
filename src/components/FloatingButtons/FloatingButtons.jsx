import React from "react";
import HelpButton from "./HelpButton/HelpButton";
import ProfileButton from "./ProfileButton/ProfileButton";
import {
	FloatingButton,
	FloatingButtonsContainer,
} from "./FloatingButtons.styles";

function FloatingButtons({ ...props }) {
	return (
		<FloatingButtonsContainer>
			<FloatingButton as={HelpButton} />
			<FloatingButton as={ProfileButton} />
		</FloatingButtonsContainer>
	);
}

export default FloatingButtons;
