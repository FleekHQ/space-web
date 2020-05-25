import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import SidebarsWrapper from '@shared/components/SidebarsWrapper';
import Files from './containers/Files';

const Storage = () => {
  const match = useRouteMatch();

  return (
    <SidebarsWrapper>
      <Switch>
        <Route path={`${match.path}/files`}>
          <Files />
        </Route>
        <Redirect to={`${match.path}/files`} />
      </Switch>
    </SidebarsWrapper>
  );
};

export default Storage;
