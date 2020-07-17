import React from 'react';

import {
  Route,
  Link,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import BucketsTable from './components/BucketsTable';

import { FileTable } from '../shared/components';

const SharedWithMeView = () => {
  const match = useRouteMatch();

  return (
    <div style={{ marginTop: 30, padding: '0 18px' }}>
      <Breadcrumbs />
      <Switch>
        <Route exact path={match.path}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span><strong>List of Buckets</strong></span>
            <Link to={`${match.path}/bucket-test/`}>BUCKET-TEST</Link>
            <BucketsTable />
          </div>
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
        <Redirect to={match.path} />
      </Switch>
    </div>
  );
};

export default SharedWithMeView;
