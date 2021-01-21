import React from 'react';
import { Provider } from 'react-redux';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createSpaceTheme from '@terminal-packages/space-ui/core/theme';

import DragableBar from '@shared/components/DragableBar';
import RegisterEvents from '@events';
import Toast from '@shared/components/Toast';

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
import FilePreview from './views/FilePreview';
import Storage from './views/Storage';
import Shared from './views/Storage/SharedBy';
import EmailLinkAuth from './views/Auth/EmailLinkAuth';
import PrivateRoute from './shared/components/PrivateRoute';

const theme = createSpaceTheme();

/* TODO: Remove SetUpWD from Final Version */

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh">
        <DragableBar />
        <Modal />
        <Router>
          <RegisterEvents />
          <Switch>
            <Route path="/(signin|signup)">
              <Auth />
            </Route>
            <Route path="/magic-link">
              <EmailLinkAuth />
            </Route>
            <Route path="/splash">
              <Splash />
            </Route>
            <Route path="/file/:hash">
              <FilePreview />
            </Route>
            <PrivateRoute txlSubscribe path="/home">
              <Storage />
            </PrivateRoute>
            <PrivateRoute txlSubscribe path="/shared">
              <Shared />
            </PrivateRoute>
            <Redirect to="/home" />
          </Switch>
        </Router>
        <Toast />
      </Box>
    </ThemeProvider>
  </Provider>
);

export default App;
