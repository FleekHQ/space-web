import React from 'react';
import Typography from '@ui/Typography';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {t('detailsPanel.title')}
      </Typography>
      <Typography variant="body2" color="secondary">
        {t('detailsPanel.message')}
      </Typography>
    </div>
  );
};

export default DetailsPanel;
