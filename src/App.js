import React from 'react';
import { Provider } from 'react-redux';
import Box from '@material-ui/core/Box';
import createFleekTheme from '@ui/theme';
import DragableBar from '@shared/components/DragableBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import registerEvents from '@events';

import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from 'react-router-dom';
import Modal from '@shared/components/Modal';
import store from './store';
import Auth from './views/Auth';
import Splash from './views/Splash';
import Storage from './views/Storage';
import PrivateRoute from './shared/components/PrivateRoute';

registerEvents();

const theme = createFleekTheme();

/* TODO: Remove SetUpWD from Final Version */

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh">
        <DragableBar />
        <Modal />
        <Router>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/splash">
              <Splash />
            </Route>
            <PrivateRoute path="/storage">
              <Storage />
            </PrivateRoute>
            <Redirect to="/storage" />
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  </Provider>
);

export default App;
