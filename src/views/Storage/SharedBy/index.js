import React from 'react';

import {
  Route,
  Link,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import { FileTable, HeaderNav } from '../shared/components';
import SharedByList from './components/SharedByList';
import useStyles from './styles';

const SharedWithMeView = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      <HeaderNav />
      <div className={classes.breadcrumbs}>
        <Breadcrumbs />
      </div>
      <Switch>
        <Route exact path={match.path}>
          <SharedByList />
        </Route>
        <Route
          path={`${match.path}/:bucket/*`}
          render={({ match: routeMatch }) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span><strong>Bucket:&nbsp;</strong>{routeMatch.params.bucket}</span>
              <span><strong>Prefix:&nbsp;</strong>{routeMatch.params[0]}</span>
              <Link to={`${routeMatch.url}/my-sub-folder`}>To my-sub-folder</Link>
              <FileTable
                bucket={routeMatch.params.bucket}
                prefix={routeMatch.params[0] || '/'}
              />
            </div>
          )}
        />
        <Route
          path={`${match.path}/:bucket`}
          render={({ match: routeMatch }) => (
            <Redirect to={`${routeMatch.url}/`} />
          )}
        />
      </Switch>
    </div>
  );
};

export default SharedWithMeView;
