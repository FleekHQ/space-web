import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { resizeWindow } from '@events';

import SignUp from './SignUp';
import SignIn from './SignIn';
import UsernameSignin from './UsernameSignin';
import ForgotPassword from './ForgotPassword';
import CreatePassword from './CreatePassword';
import RestoreKeysMnemonic from './RestoreKeysMnemonic';

import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  React.useEffect(() => {
    resizeWindow({
      width: 670,
      height: 400,
    });

    return () => {
      resizeWindow({
        width: 1200,
        height: 680,
      });
    };
  }, []);

  return (
    <div className={classes.root}>
      <Switch>
        <Route path={`${match.path}/signin`} exact>
          <SignIn />
        </Route>
        <Route path={`${match.path}/signin/username`} exact>
          <UsernameSignin />
        </Route>
        <Route path={`${match.path}/signup`} exact>
          <SignUp />
        </Route>
        <Route path={`${match.path}/forgot-password`} exact>
          <ForgotPassword />
        </Route>
        <Route path={`${match.path}/create-password`} exact>
          <CreatePassword />
        </Route>
        <Route path={`${match.path}/forgot-password/restore-keys-mnemonic`} exact>
          <RestoreKeysMnemonic />
        </Route>
        <Redirect to={`${match.path}/signup`} exact />
      </Switch>
    </div>
  );
};

export default Auth;
