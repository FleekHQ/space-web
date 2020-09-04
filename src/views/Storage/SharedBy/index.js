import React, { useEffect } from 'react';
import get from 'lodash/get';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { fetchSharedObjects } from '@events/objects';
import { useHistory, matchPath } from 'react-router-dom';

import { FileTable, HeaderNav } from '../shared/components';
import useStyles from './styles';

const SharedWithMeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  const { t } = useTranslation();

  const match = matchPath(location.pathname, { path: '/storage/shared-by/*' });
  const prefix = get(match, 'params.0', '') || '';

  useEffect(() => {
    fetchSharedObjects();
  }, [history.location.pathname]);

  return (
    <div className={classes.root}>
      <HeaderNav />
      <div className={classes.breadcrumbs}>
        <Typography variant="h6" className={classes.title} weight="medium">
          {t('navigation.shared-by')}
        </Typography>
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
