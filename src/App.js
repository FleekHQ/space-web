import React from 'react';
import { Provider } from 'react-redux';
import createFleekTheme from '@ui/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import store from './store';

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
  <Provider store={store}>
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
  </Provider>
);

export default App;
