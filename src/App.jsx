import "./styles/base.scss";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

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

	useEffect(() => {
		window.addEventListener("popstate", () => setNavStatus(checkNav()));

		axios.interceptors.request.use((request) => {
			//? Adds authentication headers to all requests made when a user is signed in
			if (user) {
				request.headers.authorisation = user.token;
			}
			return request;
		});

		axios.interceptors.response.use(
			//? If an error response has a redirect key, redirect user to that page
			(response) => response,
			(error) => {
				console.log("caught error response");
				if (error.response.data.redirect) {
					window.location = error.response.data.redirect;
					//* This is a shoddy way of redirecting, should find a way to do it properly with react router dom
				}
				return Promise.reject(error);
			}
		);
		//TODO: Handle timeout response
	}, [user]);

	return (
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
									<LoginForm setUserFn={setUser} user={user} />
								</Card>
							</Route>
							<Route path="/request">
								<Card
									className="centerV centerH card"
									style={{ width: "400px" }}
								>
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
					{/* TODO: Hide authenticated options */}
					{/* TODO: Profile section */}
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
