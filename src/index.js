import "react-hot-loader";

import "react-app-polyfill/ie11"; //* These imports allow IE compatibility
import "react-app-polyfill/stable";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
