import "./Profile.scss";

import React, { useContext } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

function Profile(props) {
	const { user } = useContext(UserContext);
	return (
		<div className="ProfilePage">
			<SectionTitle>
				{user.first_name} {user.last_name}
			</SectionTitle>
			<BodyText>Employee Number: {user.employee_number} </BodyText>
			<BodyText>Depot: {user.depot.name} </BodyText>
			<BodyText>Email: {user.email}</BodyText>
			<BodyText>Phone: {user.phone}</BodyText>
			<Fab
				variant="extended"
				component={Link}
				to="/request"
				color="primary"
				className="backToRequestsButton"
			>
				<ArrowBack />
				<label htmlFor="">return</label>
			</Fab>
		</div>
	);
	//TODO: Styling
}

export default Profile;
