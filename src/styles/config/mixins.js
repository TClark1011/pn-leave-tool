import { css } from "styled-components";

export const flexWrapperMixin = ({
	isInline = false,
	justify = "flex-start",
	align = "flex-start",
}) => css`
	display: ${isInline ? "inline-flex" : "flex"};
	justify-content: ${justify};
	align-items: ${align};
`;

export const yMarginsMixin = (value) => css`
	margin-top: ${value};
	margin-bottom: ${value};
`;

export const xMarginsMixin = (value) => css`
	margin-left: ${value};
	margin-right: ${value};
`;

export const xPaddingMixin = (value) => css`
	padding-left: ${value};
	padding-right: ${value};
`;

export const yPaddingMixin = (value) => css`
	padding-top: ${value};
	padding-bottom: ${value};
`;
