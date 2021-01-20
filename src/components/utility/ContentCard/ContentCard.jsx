import "./ContentCard.scss";
import React from "react";
import classnames from "classnames";
import { Card } from "@material-ui/core";

function ContentCard({ className, children, ...props }) {
	return (
		<Card {...props} className={classnames("ContentCard__root", className)}>
			{children}
		</Card>
	);
}

export default ContentCard;
