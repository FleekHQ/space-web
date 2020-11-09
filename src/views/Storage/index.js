import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { getLinkedAddresses } from '@events';

import Layout from '@shared/components/Layout';

import Files from './Files';
import SharedWithMe from './SharedBy';
import DetailsPanel from './DetailsPanel';
import WelcomeMessages from './shared/components/WelcomeMessages';

import useStyles from './styles';

const Storage = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  // pre-fetching data for Settings
  useEffect(() => {
    getLinkedAddresses();
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.viewContent}>
          <Switch>
            <Route path={`${match.path}/files/*`}>
              <Files />
            </Route>
            <Route path={`${match.path}/shared-by`}>
              <SharedWithMe />
            </Route>
            <Redirect to={`${match.path}/files/`} />
          </Switch>
          <WelcomeMessages />
        </div>
        <DetailsPanel />
      </div>
    </Layout>
  );
};

export default Storage;
