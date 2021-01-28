export const flexWrapperMixin = ({
	isInline = false,
	justify = "flex-start",
	align = "flex-start",
}) => `
	display: ${isInline ? "inline-flex" : "flex"};
	justify-content:${justify};
	align-items:${align};
`;

export const yMarginsMixin = (value) => `
	margin-top:${value};
	margin-bottom:${value};
`;

export const xMarginsMixin = (value) => `
	margin-left:${value};
	margin-right:${value};
`;

export const xPaddingMixin = (value) => `
	padding-left:${value};
	padding-right:${value};
`;

export const yPaddingMixin = (value) => `
	padding-top:${value};
	padding-bottom:${value};
`;
