import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createFleekTheme from '@ui/theme';

import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from 'react-router-dom';
import Auth from './views/Auth';
import Storage from './views/Storage';

const theme = createFleekTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> 
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/storage">
          <Storage />
        </Route>
        <Redirect to="/storage" />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
