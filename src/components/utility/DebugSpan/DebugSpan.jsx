import React from "react";
import { DebugSpanEl } from "./DebugSpan.styles";

/**
 * Data to only be displayed in development environment
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @param {boolean} [props.extraCondition=true] An extra
 * condition that needs to be met to display the data.
 * Defaults to true, meaning there is effectively no extra
 * condition by default.
 * @param {boolean} [props.noPostfix=false]  Whether or not
 * to hide appended postfix message
 * @param {string} [props.postfix="(dev only)"] The postfix
 * message to be appended.
 * @param {boolean} [props.italics=true] Whether or not to
 * apply italic text style to children.React
 * @param {boolean} [props.preSpacing=true] Whether or not to
 * apply a left margin
 * @param {boolean} [props.postSpacing=false] Whether or not to
 * apply a right margin
 * @param {ReactNode | null} [props.fallback=null] Fallback node
 * to be rendered if the application is not in development
 * environment.
 * @returns {ReactNode} The component's rendered elements
 */
const DebugSpan = ({
	extraCondition = true,
	noPostfix = false,
	postfix = "(dev only)",
	italics = true,
	preSpacing = true,
	postSpacing = false,
	fallback = null,
	children,
	...props
}) =>
	process.env.NODE_ENV === "development" && extraCondition ? (
		<DebugSpanEl
			preSpacing={preSpacing}
			postSpacing={postSpacing}
			italics={italics}
			{...props}
		>
			{children}
			{!noPostfix && " " + postfix}
		</DebugSpanEl>
	) : (
		fallback
	);
export default DebugSpan;
