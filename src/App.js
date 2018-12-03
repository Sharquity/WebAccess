import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

// import logo from './logo.svg';
// import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import Landing from './Pages/Landing'
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './Components/AppBar'

import * as routes from './constant_routes'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
})

const styles = theme => ({

  
});

class App extends Component {
  state = { theme }
  
  render() {
    return (
        <Router>
          <MuiThemeProvider theme={this.state.theme}>
                  <CssBaseline />
            <div className={styles.root}>
              <AppBar color="inherit" />
              <Switch>
                <Route name='landing' exact path={routes.LANDING} component={Landing} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </Router>
    );
  }
}

export default withStyles(styles)(App);
