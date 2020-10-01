import "./styles/base.scss";
import "./styles/forms.scss";

import React from "react";

import { Card }  from '@material-ui/core'
import { ThemeProvider }  from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from "./Theme"

import LoginForm from "./components/LoginForm"

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div id="App">
          <div id="content">
              <Card className="centerV centerH card">
                  <LoginForm />
              </Card>
          </div>
        </div>
    </ThemeProvider>
  );
}

export default App;