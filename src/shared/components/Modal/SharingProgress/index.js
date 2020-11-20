import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@ui/Typography';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import classnames from 'classnames';
import useStyles from './styles';

const DELAYED_CLOSE_DELAY = 3000;
const TRANSITION_TIMEOUT = 300;

const SharingProgress = ({ closeModal, notificationId }) => {
  const {
    files: objects,
    success,
    loading,
    error,
  } = useSelector((s) => (s.detailsPanel.share.shareFileByPublicKey.find((notification) => (
    notification.id === notificationId))));

  const allFolders = objects.filter((obj) => obj.type === 'folder');

  const classes = useStyles();
  const [timeoutIdAnimation, setTimeoutIdAnimation] = useState(null);
  const [timeoutIdDelayedClose, setTimeoutIdDelayedClose] = useState(null);
  const { t } = useTranslation();

  const modalCloseAnimation = () => {
    setTimeoutIdAnimation(
      setTimeout(closeModal, TRANSITION_TIMEOUT),
    );
  };

  useEffect(() => {
    if (error === 'not-found-usernames') {
      // if the error is due to usernames not found, another Modal
      // displays the error
      closeModal();
    } else if (success || error) {
      setTimeoutIdDelayedClose(
        setTimeout(modalCloseAnimation, DELAYED_CLOSE_DELAY),
      );
    }
  }, [success, error]);

  useEffect(() => () => {
    clearTimeout(timeoutIdAnimation);
    clearTimeout(timeoutIdDelayedClose);
  }, []);

  const translationTitle = objects.length === 1
    ? objects[0].name
    : `${t(
      'detailsPanel.foldersNumber',
      { count: allFolders.length },
    )}, ${t(
      'detailsPanel.filesNumber',
      { count: objects.length - allFolders.length },
    )}`;

  const getMessage = () => {
    if (loading) {
      return 'sharingProgressModal.inProgress';
    }
    if (success) {
      return 'sharingProgressModal.message';
    }
    return 'sharingProgressModal.failedToShare';
  };

  return (
    <Grow in={!timeoutIdAnimation} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div>
          {!loading
            ? (
              <FontAwesomeIcon
                icon={success ? faCheckCircle : faExclamationCircle}
                className={classnames(classes.icon, {
                  [classes.successIcon]: success,
                  [classes.errorIcon]: error,
                })}
              />
            )
            : (
              <FontAwesomeIcon spin className={classes.loader} icon={faSpinner} />
            )}
          <Typography variant="body1" weight="medium" component="span">
            <Trans
              i18nKey={
                getMessage()
              }
              values={{ fileName: translationTitle }}
              components={[<Box fontWeight="600" component="span" />]}
            />
          </Typography>
        </div>
      </div>
    </Grow>
  );
};

SharingProgress.propTypes = {
  closeModal: PropTypes.func.isRequired,
  notificationId: PropTypes.string.isRequired,
};

export default SharingProgress;
