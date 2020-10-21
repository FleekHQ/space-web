import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@terminal-packages/space-ui/core/Button';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const CreateLinkButton = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      variant="primary"
      className={classes.button}
      {...props}
    >
      {t('modals.sharingModal.shareLink.createLink')}
    </Button>
  );
};

export default CreateLinkButton;
