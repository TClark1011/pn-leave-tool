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
			default:
				return "request";
		}
	})();
	const [bottomNav, setBottomNav] = useState(startingPage);
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
								<Card className="centerV centerH card">
									<LeaveList user={user} />
								</Card>
							</Route>
							<Route path="/">
								<Redirect to="/request" />
							</Route>
						</Switch>
					</div>
					<BottomNavigation
						value={bottomNav}
						onChange={(e, newValue) => setBottomNav(newValue)}
						className="bottom-navigation-bar"
						showLabels
					>
						<BottomNavigationAction
							label={accountLabel}
							value="account"
							icon={<Icon>{accountIcon}</Icon>}
							component={Link}
							to="/login"
						/>
						<BottomNavigationAction
							label="Submit Request"
							value="request"
							icon={<Icon>event</Icon>}
							component={Link}
							to="/request"
						/>
					</BottomNavigation>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
