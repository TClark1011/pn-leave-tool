import { Fab } from "@material-ui/core";
import { Person } from "@material-ui/icons";

import React, { useContext } from "react";
import UserContext from "../../utility/UserContext";
import { Link } from "react-router-dom";

const ProfileButton = (props) => {
	const { user } = useContext(UserContext);
	if (!user) {
		return null;
	}
	return (
		<Fab
			className="FloatingProfileButton"
			color="primary"
			component={Link}
			to={"/profile"}
			{...props}
		>
			<Person />
		</Fab>
	);
};

export default ProfileButton;
