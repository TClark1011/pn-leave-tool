export const flexWrapperMixin = ({
	isInline = false,
	justify = "flex-start",
	align = "flex-start",
}) => `
	display: ${isInline ? "inline-flex" : "flex"};
	justify-content:${justify};
	align-items:${align}	
`;
