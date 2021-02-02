import { Fab } from "@material-ui/core";
import { Person } from "@material-ui/icons";

import React, { useContext } from "react";
import UserContext from "../../utility/UserContext";
import { Link } from "react-router-dom";

/**
 * Profile Floating Button. Links to the profile page.
 *
 * @param {object} props component props
 * @returns {ReactNode} The profile button. Does not appear
 * if user is not signed in or if they are already on the
 * profile screen.
 */
const ProfileButton = (props) => {
	const { user } = useContext(UserContext);
	if (!user) {
		return null;
	}
	return (
		<Fab color="primary" component={Link} to={"/profile"} {...props}>
			<Person />
		</Fab>
	);
};

export default ProfileButton;
