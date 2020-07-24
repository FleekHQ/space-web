import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Layout from '@shared/components/Layout';

import Files from './Files';
import SharedWithMe from './SharedBy';
import DetailsPanel from './DetailsPanel';

import useStyles from './styles';

const Storage = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <Layout>
      <div className={classes.root}>
        <Switch>
          <Route path={`${match.path}/files/*`}>
            <Files />
          </Route>
          <Route path={`${match.path}/shared-by`}>
            <SharedWithMe />
          </Route>
          <Redirect to={`${match.path}/files/`} />
        </Switch>
        <DetailsPanel />
      </div>
    </Layout>
  );
};

export default Storage;
