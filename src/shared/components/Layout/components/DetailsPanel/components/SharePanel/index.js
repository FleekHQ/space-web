import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CollaboratorList from '../CollaboratorList';

import useStyles from './styles';

const SharePanel = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant="contained"
      >
        {t('detailsPanel.share.invite')}
      </Button>
      <Button
        fullWidth
        variant="outlined"
      >
        {t('detailsPanel.share.copy')}
      </Button>
      <div className={classes.shareWidth}>
        <Typography variant="body1">
          {t('detailsPanel.share.with')}
        </Typography>
        <Typography component="a" variant="body1" color="textSecondary">
          {t('detailsPanel.share.manage')}
        </Typography>
      </div>
      <CollaboratorList t={t} />
    </div>
  );
};

export default SharePanel;
