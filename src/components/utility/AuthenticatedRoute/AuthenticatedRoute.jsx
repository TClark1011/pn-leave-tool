import React from "react";

import { Route, Redirect } from "react-router-dom";

function AuthenticatedRoute(props) {
	if (props.user) {
		return <Route {...props}>{props.children}</Route>;
	} else {
		return <Redirect to="/login?redir"></Redirect>;
	}
}

export default AuthenticatedRoute;
