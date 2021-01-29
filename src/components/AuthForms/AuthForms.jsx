import React, { useState, useContext } from "react";

import { withRouter } from "react-router-dom";

import TabPanel from "../utility/MuiTabPanel";

import UserContext from "../utility/UserContext";

import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import { AuthFormsTabsContainer, AuthFormTab } from "./AuthForms.styles";
import { Box } from "@material-ui/core";

function AuthForms({ history, form, ...props }) {
	const tabIndexes = {
		login: 0,
		register: 1,
	};
	const [tabValue, setTabValue] = useState(tabIndexes[form] || 0);
	const { user } = useContext(UserContext);

	function handleTabChange(_, tab) {
		setTabValue(tab);
		history.push(
			Object.keys(tabIndexes).find((key) => tabIndexes[key] === tab),
		);
	}

	function setTab(form) {
		handleTabChange(null, tabIndexes[form]);
	}

	if (user) {
		return <h1>Signed in as Employee #{user.employee_number}</h1>;
	}
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
}

export default withRouter(AuthForms);
