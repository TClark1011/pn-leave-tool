import "./Profile.scss";

import React, { useContext } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack, Email, HomeWork, Phone, Work } from "@material-ui/icons";
import ProfileItem from "./ProfileItem/ProfileItem";

function Profile(props) {
	const { user } = useContext(UserContext);
	return (
		<div className="ProfilePage">
			<SectionTitle>
				{user.first_name} {user.last_name}
			</SectionTitle>

			<div className="profile-fields">
				<ProfileItem Icon={Work} label="Employee Number">
					{user.employee_number}
				</ProfileItem>
				<ProfileItem Icon={HomeWork} label="Depot">
					{user.depot.name}
				</ProfileItem>
				<ProfileItem Icon={Email} label="Email">
					{user.email}
				</ProfileItem>
				<ProfileItem Icon={Phone} label="Phone">
					{user.phone}
				</ProfileItem>
			</div>
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
