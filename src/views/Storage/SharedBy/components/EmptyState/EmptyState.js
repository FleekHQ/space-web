import React from 'react';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const EmptyState = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <p className={classes.emoji}>&#129393;</p>
      <Typography weight="medium" className={classes.title}>
        {t('modules.storage.sharedBy.fileTable.empty.title')}
      </Typography>
      <Typography className={classes.message}>
        {t('modules.storage.sharedBy.fileTable.empty.message')}
      </Typography>
    </div>
  );
};

export default EmptyState;
