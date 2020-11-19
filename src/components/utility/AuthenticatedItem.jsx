//#Only render children if user is signed in
import React, { useContext } from "react";

import UserContext from "./UserContext";

function AuthenticatedItem({ elseRender, children, ...props }) {
	const { user, setUser } = useContext(UserContext);
	if (user) {
		return <>{children}</>;
	}
	return elseRender || null;
}

export default AuthenticatedItem;
