import React, { useContext } from "react";
import { ArrowDropDown } from "@material-ui/icons";

import ProfileContext from "../../utility/ProfileContext";
import FormField from "../../utility/Forms/FormField";
import { ProfileItemRoot } from "./ProfileItem.styles";

const ProfileItem = ({
	Icon,
	color,
	label,
	ItemComponent,
	children,
	...props
}) => {
	const { editMode } = useContext(ProfileContext);
	ItemComponent = ItemComponent || FormField;
	return (
		<ProfileItemRoot>
			<ItemComponent
				InputProps={{
					startAdornment: <ProfileItemIcon Icon={Icon} color={color} />,
				}}
				inputProps={{ disabled: props.disabled || !editMode }}
				SelectProps={{ IconComponent: editMode ? ArrowDropDown : () => null }}
				{...props}
			/>
		</ProfileItemRoot>
	);
};

const ProfileItemIcon = ({ Icon, color }) => {
	return <Icon style={{ backgroundColor: color || "white" }} />;
};

export default ProfileItem;
