import "./Profile.scss";

import React, { useContext } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";

function Profile(props) {
	const { user } = useContext(UserContext);
	return (
		<div className="profile">
			<SectionTitle>
				{user.first_name} {user.last_name}
			</SectionTitle>
			<BodyText>Employee Number: {user.employee_number} </BodyText>
			<BodyText>Depot: {user.depot.name} </BodyText>
			<BodyText>Stored Leave: {user.leave} days</BodyText>
			<BodyText>Email: {user.email}</BodyText>
			<BodyText>Phone: {user.phone}</BodyText>
		</div>
	);
	//TODO: Styling
}

export default Profile;
