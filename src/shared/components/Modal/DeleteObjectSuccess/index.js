import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Grow from '@material-ui/core/Grow';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const DELAYED_CLOSE_DELAY = 3000;
const TRANSITION_TIMEOUT = 300;

const DeleteObjectSuccess = ({ closeModal, isFile }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [timeoutIdAnimation, setTimeoutIdAnimation] = useState(null);
  const [timeoutIdDelayedClose, setTimeoutIdDelayedClose] = useState(null);
  const modalCloseAnimation = () => {
    setTimeoutIdAnimation(
      setTimeout(closeModal, TRANSITION_TIMEOUT),
    );
  };

  useEffect(() => {
    if (!timeoutIdDelayedClose) {
      setTimeoutIdDelayedClose(
        setTimeout(modalCloseAnimation, DELAYED_CLOSE_DELAY),
      );
    } else {
      clearTimeout(timeoutIdAnimation);
      clearTimeout(timeoutIdDelayedClose);
    }
  }, []);

  return (
    <Grow in={!timeoutIdAnimation} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <FontAwesomeIcon
          icon={faCheck}
          className={classes.iconCheck}
        />
        <Typography className={classes.text}>
          {isFile ? (
            t('modals.deleteObject.successFile')
          ) : (
            t('modals.deleteObject.successFolder')
          )}
        </Typography>
      </div>
    </Grow>
  );
};

DeleteObjectSuccess.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isFile: PropTypes.bool.isRequired,
};

export default DeleteObjectSuccess;
