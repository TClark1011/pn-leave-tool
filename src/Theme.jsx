import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		type: "light",
		primary: { main: "#004B8D", light: "#007bc3", dark: "#002d6b" },
		secondary: { main: "#F2A900" },
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
		fontSize: 16,
		h1: {
			fontSize: "3em",
			fontWeight: 600,
			color: "#212121",
		},
		h2: {
			fontSize: "2em",
			fontWeight: 500,
			color: "#212121",
		},
	},
});

//# NOTES
//* Page Titles (eg; 'Login') use h2

export default theme;
