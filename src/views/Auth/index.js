import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import UsernameSignin from './UsernameSignin';
import RecoverAccount from './RecoverAccount';

import useStyles from './styles';

const { PUBLIC_URL } = process.env;

const Auth = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      <div className={classes.logoContent}>
        <img src={`${PUBLIC_URL}/assets/images/auth_logo.svg`} alt="space app logo" />
      </div>
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
        <Route path={`${match.path}/recover-account`} exact>
          <RecoverAccount />
        </Route>
        <Redirect to={`${match.path}/signup`} exact />
      </Switch>
    </div>
  );
};

export default Auth;
