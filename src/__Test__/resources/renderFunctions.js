import { ThemeProvider as StyledThemeProvider } from "styled-components";
import React from "react";

import { render } from "@testing-library/react";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../../styles/theme";

export const renderWithTheme = (children) =>
	render(
		<MuiThemeProvider theme={theme}>
			<StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
		</MuiThemeProvider>,
	);
