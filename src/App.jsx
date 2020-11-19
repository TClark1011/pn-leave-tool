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

import UserContext from "./components/utility/UserContext";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'

import AuthForms from "./components/AuthForms";

import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import Profile from "./components/Profile";

import AuthenticatedRoute from "./components/utility/AuthenticatedRoute";
import AuthenticatedItem from "./components/utility/AuthenticatedItem";

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
				<AuthenticatedItem>
					<BottomNavigationAction
						label="Submit"
						value="request"
						icon={<Icon>send</Icon>}
						component={Link}
						to="/request"
					/>
				</AuthenticatedItem>
				<AuthenticatedItem>
					<BottomNavigationAction
						label="Requests"
						value="leave"
						icon={<Icon>event</Icon>}
						component={Link}
						to="/leave"
					/>
				</AuthenticatedItem>
			</BottomNavigation>
		);
		//FIXME: Items in 'AuthenticatedItem do not work properly after user signs in (eg; Bottom Nav Actions don't have labels and their links do not work)
	}
}

export default App;
