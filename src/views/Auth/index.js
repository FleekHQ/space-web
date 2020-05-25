import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import SignUp from './SignUp';

const Auth = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/signup`}>
        <SignUp />
      </Route>
      <Redirect to={`${match.path}/signup`} />
    </Switch>
  );
};

export default Auth;
