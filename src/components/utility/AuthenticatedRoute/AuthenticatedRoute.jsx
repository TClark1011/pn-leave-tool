import React from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

function AuthenticatedRoute(props) {
	if (props.user) {
		return <Route {...props}>{props.children}</Route>;
	} else {
		return <Redirect to="/login"></Redirect>;
	}
}

export default AuthenticatedRoute;
