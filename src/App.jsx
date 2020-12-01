import "./styles/base.scss";

import React, { useState, useEffect } from "react";

import { tokenAdder, errorCatcher } from "./services/interceptors";

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

import UserContext from "./components/utility/UserContext";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'

import AuthForms from "./components/AuthForms";

import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import Profile from "./components/Profile";

import AuthenticatedRoute from "./components/utility/AuthenticatedRoute";

const checkNav = () => {
	switch (window.location.pathname) {
		case "/profile":
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

	function getAuthLink() {
		return user ? "/profile" : "/login";
	}

	useEffect(() => {
		window.addEventListener("popstate", () => setNavStatus(checkNav()));

		tokenAdder(user);
		errorCatcher();
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ThemeProvider theme={theme}>
				{/** Theme provider component passes 'theme' down to all child components*/}
				<CssBaseline />
				{/** Initialises a standard 'default' css sheet to avoid visual discrepancies caused by different browser default stylesheets*/}
				<div id="App">
					<Router>
						<div id="Content">
							<Switch>
								<Route path="/login">
									<Card className="centerV centerH card">
										<AuthForms form="login" />
									</Card>
								</Route>
								<Route path="/register">
									<Card className="centerV centerH card">
										<AuthForms form="register" />
									</Card>
								</Route>
								<AuthenticatedRoute path="/request">
									<Card
										className="centerV centerH card"
										style={{ width: "400px" }}
									>
										<LeaveForm user={user} />
									</Card>
								</AuthenticatedRoute>
								<AuthenticatedRoute path="/profile">
									<Card className="centerV centerH card">
										<Profile />
									</Card>
								</AuthenticatedRoute>
								<AuthenticatedRoute path="/leave">
									<LeaveList user={user} />
								</AuthenticatedRoute>
								<Route path="/">
									<Redirect to="/login" />
								</Route>
							</Switch>
						</div>
						<BottomNavBar />
					</Router>
				</div>
			</ThemeProvider>
		</UserContext.Provider>
	);

	function BottomNavBar(props) {
		useEffect(() => {
			setNavStatus(checkNav());
		});

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
					to={getAuthLink()}
				/>
				<BottomNavigationAction
					label="Submit"
					value="request"
					icon={<Icon>send</Icon>}
					component={Link}
					to="/request"
					disabled={!user}
				/>
				<BottomNavigationAction
					label="Requests"
					value="leave"
					icon={<Icon>event</Icon>}
					component={Link}
					to="/leave"
					disabled={!user}
				/>
			</BottomNavigation>
		);
		//FIXME: Authenticated Item bottom nav actions don't light up with navigation
		//FIXME: Authenticated Item bottom nav actions don't show label when not selected
	}
}

export default App;
