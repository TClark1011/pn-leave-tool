import "./LabelledDivider.scss";

import React from "react";

function LabelledDivider(props) {
	return <div className="labelled-divider">{props.label || ""}</div>;
}

export default LabelledDivider;
