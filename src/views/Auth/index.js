import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import SignUp from './SignUp';

import useStyles from './styles';

const Auth = () => {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/assets/images/auth_logo.svg" alt="space app logo"/>
      <Switch>
        <Route path={`${match.path}/signup`}>
          <SignUp />
        </Route>
        <Redirect to={`${match.path}/signup`} />
      </Switch>
    </div>
  );
};

export default Auth;
