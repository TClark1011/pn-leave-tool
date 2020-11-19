import React from "react";

import { Route, withRouter } from "react-router-dom";

import AuthenticatedItem from "./AuthenticatedItem";

function AuthenticatedRoute(props) {
	return (
		<AuthenticatedItem elseRun={() => props.history.push("/login?redir")}>
			<Route {...props}>{props.children}</Route>
		</AuthenticatedItem>
	);
}

export default withRouter(AuthenticatedRoute);
