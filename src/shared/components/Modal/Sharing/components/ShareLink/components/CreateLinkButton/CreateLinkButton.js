import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const CreateLinkButton = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      className={classes.button}
      {...props}
    >
      {t('modals.sharingModal.shareLink.createLink')}
    </Button>
  );
};

export default CreateLinkButton;
