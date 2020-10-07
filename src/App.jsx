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

function App() {
	const [user, setUser] = useState(null);
	const [bottomNav, setBottomNav] = useState("request");
	return (
		<ThemeProvider theme={theme}>
			{/** Theme provider component passes 'theme' down to all child components*/}
			<CssBaseline />{" "}
			{/** Initialises a standard 'default' css sheet to avoid visual discrepancies causes by different browser default stylesheets*/}
			<div id="App">
				<Router>
					<div id="content">
						<Switch>
							<Route path="/login">
								<Card className="centerV centerH card">
									<LoginForm setUserFn={setUser} />
								</Card>
							</Route>
							<Route path="/request">
								<Card className="centerV centerH card">
									<LeaveForm user={user} />
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
							label="Login"
							value="login"
							icon={<Icon>account_box</Icon>}
							component={Link}
							to="/login"
						/>
						<BottomNavigationAction
							label="Submit Request"
							value="request"
							icon={<Icon>schedule</Icon>}
							component={Link}
							to="/request"
						/>
					</BottomNavigation>
				</Router>
			</div>
		</ThemeProvider>
	);

	//TODO: Add dom routing
}

export default App;
