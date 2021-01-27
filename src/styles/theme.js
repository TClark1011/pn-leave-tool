import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		type: "light",
		primary: {
			main: "hsl(215, 100%, 50%);",
			light: "hsl(215, 100%, 70%)",
			dark: "hsl(215, 100%, 30%)",
		},
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

//TODO: Pull values from scss using solution from here: https://github.com/css-modules/css-modules/issues/86

export default theme;
