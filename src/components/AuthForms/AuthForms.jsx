import React, { useState, useContext } from "react";

import { withRouter } from "react-router-dom";

import TabPanel from "../utility/MuiTabPanel";

import UserContext from "../utility/UserContext";

import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import { AuthFormsTabsContainer, AuthFormTab } from "./AuthForms.styles";
import { Box } from "@material-ui/core";
import { useMount } from "react-use";

/**
 * Container/switcher for authentication forms
 * Allows switching between login and registration
 * through material-ui tabs.
 *
 * @param {object} props The component props
 * @param {Router.History} props.history 'react-router' history
 * @param {string} props.form the currently active form
 * @returns {ReactNode} The component's rendered elements
 */
const AuthForms = ({ history, form }) => {
	const tabIndexes = {
		login: 0,
		register: 1,
	};
	//? Get number index of form name

	const [tabValue, setTabValue] = useState(tabIndexes[form] || 0);
	const { user, setUser } = useContext(UserContext);

	useMount(() => {
		if (user) setUser(null);
		//? If user is already logged in when this component mounts, log them out
	});

	/**
	 * Handle user switching between login and registration tabs
	 *
	 * @param {Event} e onChange event fired by Material UI 'Tabs'
	 * @param {number} tab The index of the tab that was switched too
	 */
	const handleTabChange = (e, tab) => {
		setTabValue(tab);
		history.push(
			Object.keys(tabIndexes).find((key) => tabIndexes[key] === tab),
		);
	};

	/**
	 * Set the active tab
	 *
	 * @param {string} form The name of the form to switch too
	 */
	const setTab = (form) => {
		handleTabChange(null, tabIndexes[form]);
	};

	return (
		<Box>
			<AuthFormsTabsContainer
				value={tabValue}
				onChange={handleTabChange}
				TabIndicatorProps={{ color: "primary" }}
			>
				<AuthFormTab label="Login" value={0} />
				<AuthFormTab label="Register" value={1} />
			</AuthFormsTabsContainer>
			<TabPanel value={tabValue} index={tabIndexes.login}>
				<LoginForm setTab={setTab} />
			</TabPanel>
			<TabPanel value={tabValue} index={tabIndexes.register}>
				<RegForm />
			</TabPanel>
		</Box>
	);
};

export default withRouter(AuthForms);
