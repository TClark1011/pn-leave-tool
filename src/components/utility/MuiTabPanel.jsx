import React from "react";

/**
 * A component designed to be used alongside Material UI Tabs.
 * Only renders its children if it's corresponding tab is active.
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @param {number} props.value The current value of the corresponding 'Tabs'
 * node.
 * @param {number} props.index The index of of the TabPanel. Only renders
 * children if 'index' is equal to 'value'.
 * @returns {ReactNode} The component's rendered elements
 */
const MuiTabPanel = ({ children, value, index, ...props }) => (
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

export default MuiTabPanel;
