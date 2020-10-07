import "./styles/base.scss";
import "./styles/forms.scss";

import React, { useState } from "react";

import {
	Card,
	CssBaseline,
	BottomNavigation,
    BottomNavigationAction,
    Icon
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'

// import LoginForm from "./components/LoginForm";
import LeaveForm from "./components/LeaveForm";

function App() {
	const [user, setUser] = useState(null);
	const [bottomNav, setBottomNav] = useState("submit");
	return (
		<ThemeProvider theme={theme}>
			{/** Theme provider component passes 'theme' down to all child components*/}
			<CssBaseline />{" "}
			{/** Initialises a standard 'default' css sheet to avoid visual discrepancies causes by different browser default stylesheets*/}
			<div id="App">
				<div id="content">
					<Card className="centerV centerH card">
						<LeaveForm user={user} />
						{/* <LoginForm setUserFn={setUser}/> */}
					</Card>
				</div>
					<BottomNavigation
						value={bottomNav}
						onChange={(event, newValue) => setBottomNav(newValue)}
                        className="bottom-navigation-bar"
					>
						<BottomNavigationAction label="Login" value="login" icon={<Icon>account_box</Icon>}/>
						<BottomNavigationAction label="Submit Leave" value="submit" icon={<Icon>schedule</Icon>}/>
					</BottomNavigation>
			</div>
		</ThemeProvider>
	);
}

export default App;
