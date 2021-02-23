import { render } from "@testing-library/react";
import React from "react";
import UserContext from "../components/utility/UserContext";
import userFixture from "../fixtures/userFixture";
import { CssBaseline, StylesProvider } from "@material-ui/core";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * A custom render function that includes all wrappers required
 * for testing
 *
 * @param {ReactNode} children The component to render inside wrappers
 * @param {object} [options] Options object
 * @param {boolean} [options.authenticate=true] Whether or not to mock
 * authentication for the render
 */
export const customRender = (children, { authenticate = true } = {}) => {
	return render(
		<UserContext.Provider value={{ user: authenticate ? userFixture : null }}>
			<StylesProvider injectFirst>
				<CssBaseline />
				<StyledThemeProvider theme={theme}>
					<Router>{children}</Router>
				</StyledThemeProvider>
			</StylesProvider>
		</UserContext.Provider>,
	);
};
