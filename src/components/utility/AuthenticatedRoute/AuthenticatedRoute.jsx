import React, { useContext } from "react";

import { Route, Redirect, withRouter } from "react-router-dom";

import UserContext from "../UserContext";

function AuthenticatedRoute(props) {
	const { user, setUser } = useContext(UserContext);
	if (user) {
		return <Route {...props}>{props.children}</Route>;
	}
	props.history.push("/login?redir");
	return null;
}

export default withRouter(AuthenticatedRoute);
