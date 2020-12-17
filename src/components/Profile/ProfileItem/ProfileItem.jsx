import "./ProfileItem.scss";

import React from "react";
import BodyText from "../../utility/BodyText";
import { TextField } from "@material-ui/core";

const ProfileItem = ({ Icon, color, label, children }) => {
	return (
		<div className="ProfileItem">
			<TextField
				InputProps={{
					startAdornment: <ProfileItemIcon Icon={Icon} color={color} />,
				}}
				variant="outlined"
				value={children}
				label={label}
				fullWidth
			/>
		</div>
	);
};

const ProfileItemIcon = ({ Icon, color }) => {
	return (
		<Icon className="item-icon" style={{ backgroundColor: color || "white" }} />
	);
};

export default ProfileItem;
