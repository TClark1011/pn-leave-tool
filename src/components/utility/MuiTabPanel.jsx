import React from "react";
/**
 * A component to be used in conjunction with Material UI tabs
 * @param {Components} children  - Children of the component
 * @param {Number} value - The value of the currently selected tab
 * @param {Number} index - The index of the tab panel
 */
function MuiTabPanel({ children, value, index, ...props }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...props}
		>
			{value === index && children}
		</div>
	);
}

export default MuiTabPanel;
