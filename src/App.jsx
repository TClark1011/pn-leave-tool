import "./styles/base.scss";
import "./styles/forms.scss";

import React from "react";

import {ThemeProvider }  from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from "./Theme"

import LoginForm from "./components/LoginForm"

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <LoginForm />
        </div>
    </ThemeProvider>
  );
}

export default App;