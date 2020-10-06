import "./styles/base.scss";
import "./styles/forms.scss";

import React, { useState } from "react";

import { Card, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'

// import LoginForm from "./components/LoginForm";
import LeaveForm from "./components/LeaveForm";

function App() {
    const [user, setUser] = useState(null);
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
			</div>
		</ThemeProvider>
	);
}

export default App;
