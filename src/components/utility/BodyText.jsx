import React from "react";

import { Typography } from "@material-ui/core";

/**
 * Standard BodyText typography component
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @param {Component | string} [props.component="p"] The component\html element
 * to use.
 * @returns {ReactNode} The component's rendered elements
 */
const BodyText = ({ children, component = "p", ...props }) => {
	return (
		<Typography variant="body1" component={component} {...props}>
			{children}
		</Typography>
	);
};

export default BodyText;
