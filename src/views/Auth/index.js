import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import SignUp from './SignUp';
// import SignIn from './SignIn';

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
        {/* <Route path={`${match.path}/signin`}>
          <SignIn />
        </Route> */}
        <Route path={`${match.path}/signup`}>
          <SignUp />
        </Route>
        <Redirect to={`${match.path}/signup`} />
      </Switch>
    </div>
  );
};

export default Auth;
