import "./FlexBox.scss";

import React from "react";

function FlexBox(props) {
	function identifierProps() {
		const baseline = "flexbox-component";
		const fullHeight = "fullHeight" in props ? baseline + " fullheight" : "";
		const fullWidth = "fullWidth" in props ? baseline + " fullwidth" : "";
		const userClass = props.className ? ` ${props.className}` : "";

		const id = "id" in props ? { id: props.id } : {};

		return {
			...id,
			className: `${baseline}${fullHeight}${fullWidth}${userClass}`,
		};
	}

	return <div {...identifierProps()}>{props.children}</div>;
}

export default FlexBox;
