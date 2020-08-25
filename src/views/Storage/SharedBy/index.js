import React, { useEffect } from 'react';
import get from 'lodash/get';
import { fetchSharedObjects } from '@events/objects';
import { useHistory, matchPath } from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import { FileTable, HeaderNav } from '../shared/components';
import useStyles from './styles';

const SharedWithMeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;

  const match = matchPath(location.pathname, { path: '/storage/shared-by/*' });
  const prefix = get(match, 'params.0', '') || '';

  useEffect(() => {
    fetchSharedObjects();
  }, [history.location.pathname]);

  return (
    <div className={classes.root}>
      <HeaderNav />
      <div className={classes.breadcrumbs}>
        <Breadcrumbs />
      </div>
      <FileTable
        prefix={prefix}
        bucket="shared-with-me"
        baseRedirectUrl="/storage/shared-by"
      />
    </div>
  );
};

export default SharedWithMeView;
