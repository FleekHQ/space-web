import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Layout from '@shared/components/Layout';
import Files from './Files';

const Storage = () => {
  const match = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/files`}>
          <Files />
        </Route>
        <Redirect to={`${match.path}/files`} />
      </Switch>
    </Layout>
  );
};

export default Storage;
