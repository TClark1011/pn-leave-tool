import "./styles/base.scss";
import "./styles/forms.scss";

import React, { useState } from "react";

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

function App() {
	const [user, setUser] = useState(null);
	const startingPage = (() => {
		switch (window.location.pathname) {
			case "/login":
				return "account";
			case "/leave":
				return "leave";
			default:
				return "request";
		}
	})();
	const [navStatus, setNavStatus] = useState(startingPage);
	//* The initial value of 'bottomNav' needs to correspond to the BottomNavigationAction value of the homepage

	const accountLabel = user ? "Profile" : "Login";
	const accountIcon = user ? "account_box" : "login";

	return (
		<ThemeProvider theme={theme}>
			{/** Theme provider component passes 'theme' down to all child components*/}
			<CssBaseline />
			{/** Initialises a standard 'default' css sheet to avoid visual discrepancies causes by different browser default stylesheets*/}
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
							<Route path="/leave">
								<LeaveList user={user} />
							</Route>
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
			</div>
		</ThemeProvider>
	);
}

function BottomNavBar(props) {
	const navStatus = props.navStatus;
	const setNavStatus = props.setNavStatus;
	const accountLabel = props.accountLabel;
	const accountIcon = props.accountIcon;

	//TODO: Update selected item on nav bar when user uses backwards/forwards browser buttons
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
