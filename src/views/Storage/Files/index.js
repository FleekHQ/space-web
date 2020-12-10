import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { useHistory, matchPath } from 'react-router-dom';
import { fetchDir } from '@events/objects';
import mapBreadcrumbs from '@shared/utils/map-breadcrumbs';
import Breadcrumbs from '@ui/Breadcrumbs';

import { FileTable, HeaderNav, FilesErrors } from '../shared/components';
import EmptyState from './components/EmptyState';
import useStyles from './styles';

const StorageMainView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  const { t } = useTranslation();

  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '') || '';

  useEffect(() => {
    fetchDir(prefix);
  }, [history.location.pathname]);

  const breadcrumbsItems = mapBreadcrumbs(t('navigation.files'), location.pathname, history);

  return (
    <div className={classes.root}>
      <HeaderNav />
      <Breadcrumbs
        items={breadcrumbsItems}
        history={history}
      />
      <FileTable
        bucket="personal"
        prefix={prefix}
        EmptyState={EmptyState}
        fetchDir={fetchDir}
      />
      <FilesErrors
        bucket="personal"
        fetchObjects={() => fetchDir(prefix)}
      />
    </div>
  );
};

export default StorageMainView;
