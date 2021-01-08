import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLinkedAddresses, subscribeToStreams } from '@events';

import Sidebar from '@shared/components/Sidebar';
import Layout from '@terminal-packages/space-ui/core/Layout';

import Files from './Files';
import DetailsPanel from './DetailsPanel';
import WelcomeMessages from './shared/components/WelcomeMessages';

import useStyles from './styles';

const Storage = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  // pre-fetching data for Settings
  // subscribing to streams, which occurs only for a logged in user
  useEffect(() => {
    dispatch(getLinkedAddresses());
    subscribeToStreams();
  }, []);

  return (
    <Layout
      sidebar={<Sidebar />}
    >
      <div className={classes.root}>
        <div className={classes.viewContent}>
          <Switch>
            <Route path={`${match.path}/*`}>
              <Files />
            </Route>
            <Redirect to={`${match.path}/`} />
          </Switch>
          <WelcomeMessages />
        </div>
        <DetailsPanel />
      </div>
    </Layout>
  );
};

export default Storage;
