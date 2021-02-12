import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { useHistory, matchPath } from 'react-router-dom';
import { fetchDir } from '@events/objects';
import mapBreadcrumbs from '@shared/utils/map-breadcrumbs';
import Breadcrumbs from '@ui/Breadcrumbs';
import Downloads from '@shared/components/Downloads';

import { FileTable, FilesErrors } from '../shared/components';
import EmptyState from './components/EmptyState';
import useStyles from './styles';

const StorageMainView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  const { t } = useTranslation();

  const match = matchPath(location.pathname, { path: '/home/*' });
  const prefix = get(match, 'params.0', '') || '';

  useEffect(() => {
    const showLoading = prefix !== '';
    fetchDir(prefix, 'personal', true, showLoading);
  }, [history.location.pathname]);

  const breadcrumbsItems = mapBreadcrumbs(t('navigation.files'), location.pathname, history);

  return (
    <div className={classes.root}>
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
      <Downloads />
    </div>
  );
};

export default StorageMainView;
