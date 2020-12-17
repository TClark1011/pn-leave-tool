import "./styles/base.scss";

import React, { useState, useEffect } from "react";

import { tokenAdder, errorCatcher } from "./services/interceptors";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import UserContext from "./components/utility/UserContext";

import theme from "./Theme"; //* Pulls theme data from 'Theme.jsx'
import MainRouter from "./components/utility/MainRouter";
import ProfileButton from "./components/ProfileButton/ProfileButton";

import { StylesProvider } from "@material-ui/core";

import { hot } from "react-hot-loader/root";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		tokenAdder(user);
		errorCatcher();
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					{/** Theme provider component passes 'theme' down to all child components*/}
					<CssBaseline />
					{/** Initialises a standard 'default' css sheet to avoid visual discrepancies caused by different browser default stylesheets*/}
					<div id="App">
						<div id="Content">
							<MainRouter>
								<ProfileButton />
							</MainRouter>
						</div>
					</div>
				</ThemeProvider>
			</StylesProvider>
		</UserContext.Provider>
	);
}

export default hot(App);
