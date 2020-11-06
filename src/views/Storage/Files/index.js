import React, { useEffect } from 'react';
import get from 'lodash/get';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory, matchPath } from 'react-router-dom';
import { fetchDir } from '@events/objects';

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

  return (
    <div className={classes.root}>
      <HeaderNav />
      <FilesErrors
        bucket="personal"
        fetchObjects={() => fetchDir(prefix)}
      />
      <Typography variant="h6" className={classes.title} weight="medium">
        {t('navigation.files')}
      </Typography>
      <FileTable
        bucket="personal"
        prefix={prefix}
        fetchObjects={() => fetchDir(prefix)}
        EmptyState={EmptyState}
      />
    </div>
  );
};

export default StorageMainView;
