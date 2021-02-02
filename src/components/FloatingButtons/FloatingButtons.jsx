import React from "react";
import HelpButton from "./HelpButton/HelpButton";
import ProfileButton from "./ProfileButton/ProfileButton";
import {
	FloatingButton,
	FloatingButtonsContainer,
} from "./FloatingButtons.styles";

/**
 * Floating buttons that are overlaid over all views.
 *
 * @returns {ReactNode} Floating Buttons
 */
const FloatingButtons = () => {
	return (
		<FloatingButtonsContainer>
			<FloatingButton as={HelpButton} />
			<FloatingButton as={ProfileButton} />
		</FloatingButtonsContainer>
	);
};

export default FloatingButtons;
