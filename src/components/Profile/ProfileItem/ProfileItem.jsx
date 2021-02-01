import React, { useContext } from "react";
import { ArrowDropDown } from "@material-ui/icons";

import ProfileContext from "../../utility/ProfileContext";
import FormField from "../../utility/Forms/FormField";
import { ProfileItemRoot } from "./ProfileItem.styles";

/**
 * Individual field in profile form
 *
 * @param {object} props The component props
 * @param {Component} props.Icon the component to render the icon with
 * @param {string} props.color the background colour of the icon
 * @param {string} props.label The label of the field
 * @param {Component} [ItemComponent=FormField] The component to be used
 * for the form.
 * @returns {ReactNode} The component's rendered elements
 */
const ProfileItem = ({
	Icon,
	color,
	label,
	ItemComponent = FormField,
	...props
}) => {
	const { editMode } = useContext(ProfileContext);
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

/**
 * The Component for the icon in the profile Item
 *
 * @param {object} props The component props
 * @param {Component} props.Icon the component to render the icon with
 * @param {string} [props.color="white"] the background colour of the icon
 * @returns {ReactNode} The component's rendered elements
 */
const ProfileItemIcon = ({ Icon, color = "white" }) => {
	return <Icon style={{ backgroundColor: color }} />;
};

export default ProfileItem;
