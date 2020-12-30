import "./DebugSpan.scss";
import React from "react";
import classnames from "classnames";

const DebugSpan = ({
	extraCondition = true,
	noPostfix = false,
	postfix = "(dev only)",
	italics = true,
	preSpacing = true,
	postSpacing = false,
	fallback = null,
	className,
	children,
	...props
}) =>
	process.env.NODE_ENV === "development" && extraCondition ? (
		<span
			className={classnames(
				"DebugSpan__root",
				{ DebugSpan__italic: italics },
				{ DebugSpan__preSpacing: preSpacing },
				{ DebugSpan__postSpacing: postSpacing },
				className
			)}
			{...props}
		>
			{children}
			{!noPostfix && postfix}
		</span>
	) : (
		fallback
	);
export default DebugSpan;
