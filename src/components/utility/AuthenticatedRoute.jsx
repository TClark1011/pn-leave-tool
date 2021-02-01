import React from "react";

import { Route, useHistory } from "react-router-dom";

import AuthenticatedItem from "./AuthenticatedItem";

/**
 * A route that can only be accessed by a user who is signed in.
 * If user is not signed in, redirect them to login screen.
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The route children
 * @returns {ReactNode} The component's rendered elements.
 * Redirects to "/login?redir" if user is not signed in.
 */
const AuthenticatedRoute = ({ children, ...props }) => {
	const history = useHistory();
	return (
		<AuthenticatedItem elseRun={() => history.push("/login?redir")}>
			<Route {...props}>{children}</Route>
		</AuthenticatedItem>
	);
};

export default AuthenticatedRoute;
