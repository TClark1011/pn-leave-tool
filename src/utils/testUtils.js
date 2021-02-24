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

/**
 * @typedef {Function} RenderShortcut A function that can be passed as the second parameter
 * of the 'test()' or 'it()' functions. It executes a call to 'customRender', then executes
 * a provided callback
 * @param {Function} callback The test logic that is executed after 'customRender' is called
 */

/**
 * Generate a function that calls 'customRender', passing the
 * provided Component automatically
 * @param {React.Component} Component The component rendered inside
 * 'customRender'
 * @returns {Function} A call to 'customRender'
 */
export const getRenderShortcut = (Component) => {
	/**
	 * A call to customRender, passing 'Component' and provided 'props'
	 * @param {object} props Props to be passed to 'component'
	 */
	return (props = {}) => customRender(<Component {...props} />);
};
/**
 * Generate a function that can be used for easy testing.
 * This function
 *
 * @param {React.Component} Component The component that the generated
 * 'RenderShortcut' will render in its call to 'customRender'
 * @returns {RenderShortcut} A generated render shortcut
 */
export const getTestFn = (Component) => (callback, props = {}) => () => {
	const container = customRender(<Component {...props} />);
	callback(container);
};

export const getTestIdShortcut = (componentName, screen) => (label) =>
	screen.queryByTestId(`${componentName}__${label}`);
