import "./AuthForms.scss";

import React, { useState, useContext } from "react";

import { withRouter } from "react-router-dom";

import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "../utility/MuiTabPanel";

import UserContext from "../utility/UserContext";

import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

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
			Object.keys(tabIndexes).find((key) => tabIndexes[key] === tab)
		);
	}

	function setTab(form) {
		handleTabChange(null, tabIndexes[form]);
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
				<AuthTab label="Login" />
				<AuthTab label="Register" />
			</Tabs>
			<TabPanel value={tabValue} index={tabIndexes.login}>
				<LoginForm setTab={setTab} />
			</TabPanel>
			<TabPanel value={tabValue} index={tabIndexes.register}>
				<RegForm />
			</TabPanel>
		</div>
	);

	function AuthTab({ label, ...props }) {
		return (
			<Tab
				label={label}
				className="tab"
				value={tabIndexes[label.toLowerCase()]}
				disableRipple
				{...props}
			/>
		);
	}
}

export default withRouter(AuthForms);
