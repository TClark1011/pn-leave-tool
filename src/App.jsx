import "./styles/base.scss";

import React, { useState, useEffect } from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import {
	Card,
	CssBaseline,
	BottomNavigation,
	BottomNavigationAction,
	Icon,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'

import LoginForm from "./components/LoginForm";
import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";

import AuthenticatedRoute from "./components/utility/AuthenticatedRoute";

const checkNav = () => {
	switch (window.location.pathname) {
		case "/login":
			return "account";
		case "/leave":
			return "leave";
		case "/request":
			return "request";
		default:
			return null;
	}
};

function App() {
	const [user, setUser] = useState(null);
	const [navStatus, setNavStatus] = useState(checkNav());
	//* The initial value of 'bottomNav' needs to correspond to the BottomNavigationAction value of the homepage

	const accountLabel = user ? "Profile" : "Login";
	const accountIcon = user ? "account_box" : "login";

	window.addEventListener("popstate", () => setNavStatus(checkNav()));

	return (
		<ThemeProvider theme={theme}>
			{/** Theme provider component passes 'theme' down to all child components*/}
			<CssBaseline />
			{/** Initialises a standard 'default' css sheet to avoid visual discrepancies caused by different browser default stylesheets*/}
			<div id="App">
				<Router>
					<div id="content">
						<Switch>
							<Route path="/login">
								<Card className="centerV centerH card">
									<LoginForm setUserFn={setUser} user={user} />
								</Card>
							</Route>
							<Route path="/request">
								<Card className="centerV centerH card">
									<LeaveForm user={user} />
								</Card>
							</Route>
							<AuthenticatedRoute path="/leave" user={user}>
								<LeaveList user={user} />
							</AuthenticatedRoute>
							<Route path="/">
								<Redirect to="/request" />
							</Route>
						</Switch>
					</div>
					<BottomNavBar
						navStatus={navStatus}
						setNavStatus={setNavStatus}
						accountLabel={accountLabel}
						accountIcon={accountIcon}
					/>
				</Router>
				{/* TODO: 'AuthenticatedRoute' component */}
			</div>
		</ThemeProvider>
	);
	//TODO: Vertical overflow of cards is hidden in IE
}

function BottomNavBar(props) {
	const navStatus = props.navStatus;
	const setNavStatus = props.setNavStatus;
	const accountLabel = props.accountLabel;
	const accountIcon = props.accountIcon;

	useEffect(() => {
		setNavStatus(checkNav());
	});

	//TODO: make sure highlighted button is always accurate to currently active section
	return (
		<BottomNavigation
			id="bottom-navigation"
			value={navStatus}
			onChange={(e, newValue) => setNavStatus(newValue)}
			className="bottom-navigation-bar"
			showLabels
			style={{ boxShadow: theme.shadows[4] }}
		>
			<BottomNavigationAction
				label={accountLabel}
				value="account"
				icon={<Icon>{accountIcon}</Icon>}
				component={Link}
				to="/login"
			/>
			<BottomNavigationAction
				label="Submit"
				value="request"
				icon={<Icon>send</Icon>}
				component={Link}
				to="/request"
			/>
			<BottomNavigationAction
				label="Requests"
				value="leave"
				icon={<Icon>event</Icon>}
				component={Link}
				to="/leave"
			/>
		</BottomNavigation>
	);
}

export default App;
