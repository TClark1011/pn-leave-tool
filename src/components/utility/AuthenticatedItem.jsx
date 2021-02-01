//#Only render children if user is signed in
import React, { useContext } from "react";

import UserContext from "./UserContext";

/**
 * A component that will only render if the user is signed in
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children Nodes that will only be
 * shown to signed in users.
 * @param {ReactNode} [props.elseRender] Node to be rendered if
 * user is not signed in
 * @param {Function} [props.elseRun] A callback function that
 * will be executed if user is not signed in.
 * @returns {ReactNode} 'children' if user is currently signed in, otherwise
 * render 'elseRender' if it is provided and/or run 'elseRun' if that is 
 * provided.
 */
const AuthenticatedItem = ({ elseRender, elseRun, children, ...props }) => {
	const { user } = useContext(UserContext);
	if (user) {
		return <>{children}</>;
	}
	if (typeof elseRun === "function") {
		elseRun();
	}
	return elseRender || null;
};

export default AuthenticatedItem;
