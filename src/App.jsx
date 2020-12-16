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
import Profile from "./components/Profile";
import SubmitLmsData from "./components/Admin/SubmitLmsData";

import AuthenticatedRoute from "./components/utility/AuthenticatedRoute";
import { landingRedir } from "./constants/autoNavParams";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
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
										<LeaveForm />
									</Card>
								</AuthenticatedRoute>
								<AuthenticatedRoute path="/profile">
									<Card className="centerV centerH card">
										<Profile />
									</Card>
								</AuthenticatedRoute>
								<Route path="/submitLmsData">
									<SubmitLmsData />
								</Route>
								{/* <Route path="/submitLmsData" component={SubmitLmsData}/> */}
								<Route path="/">
									<Redirect to={landingRedir} />
								</Route>
							</Switch>
						</div>
					</Router>
				</div>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
