import "./AuthForms.scss";

import React, { useState, useContext } from "react";

import { AppBar, Tabs, Tab } from "@material-ui/core";

import TabPanel from "../utility/MuiTabPanel";

import UserContext from "../utility/UserContext";

import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

function AuthForms({ form, ...props }) {
	const tabIndexes = {
		login: 0,
		register: 1,
	};
	const [tabValue, setTabValue] = useState(tabIndexes[form] || 0);
	const { user, setUser } = useContext(UserContext);

	function handleTabChange(event, tab) {
		setTabValue(tab);
	}

	if (user) {
		return <h1>Signed in as Employee #{user.employee_number}</h1>;
	}
	return (
		<div className="auth-forms">
			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				className="tabs-bar"
				TabIndicatorProps={{ color: "primary" }}
			>
				<Tab label="Login" className="tab" />
				<Tab label="Register" className="tab" />
			</Tabs>
			<TabPanel value={tabValue} index={tabIndexes.login}>
				<LoginForm />
			</TabPanel>
			<TabPanel value={tabValue} index={tabIndexes.register}>
				<RegForm />
			</TabPanel>
		</div>
	);
}

export default AuthForms;
