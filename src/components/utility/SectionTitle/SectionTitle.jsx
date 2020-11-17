import "./SectionTitle.scss";

import React from "react";

import Typography from "@material-ui/core/Typography";

import classNames from "classnames";

function SectionTitle(props) {
	return (
		<Typography
			component="h2"
			variant="h2"
			{...props}
			className={classNames("section-title", props.className)}
		>
			{props.children}
		</Typography>
	);
}

export default SectionTitle;
