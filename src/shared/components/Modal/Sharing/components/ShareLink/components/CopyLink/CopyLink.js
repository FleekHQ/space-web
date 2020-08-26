import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import useStyles from './styles';

const CopyLink = ({ url }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onClick = () => {
    copy(url);
  };

  return (
    <div className={classes.root}>
      <OutlinedInput
        value={url}
        variant="outlined"
        className={classes.input}
      />
      <Button
        onClick={onClick}
        variant="contained"
        className={classes.button}
      >
        {t('modals.sharingModal.shareLink.copyLink')}
      </Button>
    </div>
  );
};

CopyLink.defaultProps = {
  url: null,
};

CopyLink.propTypes = {
  url: PropTypes.string,
};

export default CopyLink;
