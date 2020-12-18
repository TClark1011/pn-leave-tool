import "./ProfileItem.scss";

import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";

import ProfileContext from "../../utility/ProfileContext";
import { Field } from "formik";
import FormField from "../../utility/Forms/FormField";

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
		<div className="ProfileItem">
			{/* <Component
				InputProps={{
					startAdornment: <ProfileItemIcon Icon={Icon} color={color} />,
				}}
				inputProps={{ disabled: !editMode }}
				SelectProps={{ IconComponent: editMode ? ArrowDropDown : () => null }}
				variant="outlined"
				label={label}
				value={props.field.value}
				onChange={props.field.onChange}
				fullWidth
				{...props}
			/> */}
			<ItemComponent
				InputProps={{
					startAdornment: <ProfileItemIcon Icon={Icon} color={color} />,
				}}
				inputProps={{ disabled: !editMode }}
				SelectProps={{ IconComponent: editMode ? ArrowDropDown : () => null }}
				{...props}
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
