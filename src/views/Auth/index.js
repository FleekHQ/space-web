import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import NonAuthorizedWrapper from '@shared/components/NonAuthorizedWrapper';
import SignUp from './containers/SignUp';

const Auth = () => {
  const match = useRouteMatch();

  return (
    <NonAuthorizedWrapper>
      <Switch>
        <Route path={`${match.path}/signup`}>
          <SignUp />
        </Route>
        <Redirect to={`${match.path}/signup`} />
      </Switch>
    </NonAuthorizedWrapper>
  );
};

export default Auth;
