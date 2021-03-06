import React, { useState, useEffect } from "react";

import { tokenAdder, errorCatcher } from "./services/interceptors";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import UserContext from "./components/utility/UserContext";

import theme from "./styles/theme";
import MainRouter from "./components/utility/MainRouter";

import { StylesProvider } from "@material-ui/core";

import { hot } from "react-hot-loader/root";
import FloatingButtons from "./components/FloatingButtons";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { AppRoot, ContentContainer } from "./App.styles";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		tokenAdder(user);
		errorCatcher();
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<StylesProvider injectFirst>
				<GlobalStyles />
				{/*? 'StylesProvider' with 'injectFirst' prop makes sure material UI styles are injected at the top of the document so that they are overridden by custom styles */}
				<MuiThemeProvider theme={theme}>
					<StyledThemeProvider theme={theme}>
						{/** Theme provider component passes 'theme' down to all child components*/}
						<CssBaseline />
						{/** Initialises a standard 'default' css sheet to avoid visual discrepancies caused by different browser default stylesheets*/}
						<AppRoot id="App">
							<ContentContainer id="Content">
								<MainRouter>
									<FloatingButtons />
								</MainRouter>
							</ContentContainer>
						</AppRoot>
					</StyledThemeProvider>
				</MuiThemeProvider>
			</StylesProvider>
		</UserContext.Provider>
	);
};

export default hot(App);
