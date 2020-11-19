//#Only render children if user is signed in
import React, { useContext } from "react";

import UserContext from "./UserContext";

function AuthenticatedItem({ elseRender, elseRun, children, ...props }) {
	const { user, setUser } = useContext(UserContext);
	if (user) {
		return <>{children}</>;
	}
	if (typeof elseRun === "function") {
		elseRun();
	}
	return elseRender || null;
}

export default AuthenticatedItem;
