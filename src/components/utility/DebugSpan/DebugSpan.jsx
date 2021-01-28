import React from "react";
import { DebugSpanEl } from "./DebugSpan.styles";

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
