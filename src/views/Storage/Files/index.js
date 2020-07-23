import React, { useEffect } from 'react';
import get from 'lodash/get';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory, matchPath } from 'react-router-dom';
import { fetchDir } from '@events/objects';
import { FileTable, HeaderNav } from '../shared/components';

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
      <Typography variant="h6" className={classes.title} weight="medium">
        {t('navigation.files')}
      </Typography>
      <FileTable bucket="personal" prefix={prefix} />
    </div>
  );
};

export default StorageMainView;
