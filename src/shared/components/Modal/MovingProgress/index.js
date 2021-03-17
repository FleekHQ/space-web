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

const MovingProgress = ({ closeModal, notificationId }) => {
  const classes = useStyles();
  const [timeoutIdAnimation, setTimeoutIdAnimation] = useState(null);
  const [timeoutIdDelayedClose, setTimeoutIdDelayedClose] = useState(null);
  const { t } = useTranslation();
  const {
    fileCount,
    preparing,
    loading,
    success,
    error,
  } = useSelector((s) => (
    s.detailsPanel.move.moveFiles.find((notification) => (
      notification.id === notificationId
    ))));

  let errorMsg = 'modals.moveFiles.error';

  const modalCloseAnimation = () => {
    setTimeoutIdAnimation(
      setTimeout(closeModal, TRANSITION_TIMEOUT),
    );
  };

  let translationTitle = '';
  if (fileCount && fileCount.folder) {
    translationTitle += `${t('modals.moveFiles.folderNumber', { count: fileCount.folder })}`;
    if (fileCount.file) {
      translationTitle += ` ${t('modals.moveFiles.and')} `;
      translationTitle += `${t('modals.moveFiles.fileNumber', { count: fileCount.file })}`;
    }
    /* eslint-disable-next-line */
    debugger;
  } else if (fileCount) {
    translationTitle += `${t('modals.moveFiles.fileNumber', { count: fileCount.file })}`;
  }

  useEffect(() => () => {
    clearTimeout(timeoutIdAnimation);
    clearTimeout(timeoutIdDelayedClose);
  }, []);

  useEffect(() => {
    if (error === 'error-reading-files') {
      errorMsg = 'modals.moveFiles.readingFilesError';
    } else if (success || error) {
      setTimeoutIdDelayedClose(
        setTimeout(modalCloseAnimation, DELAYED_CLOSE_DELAY),
      );
    }
  }, [success, error]);

  const getMessage = () => {
    if (loading) {
      return 'modals.moveFiles.loading';
    }
    if (success) {
      return 'modals.moveFiles.success';
    }
    if (error) {
      return errorMsg;
    }
    return 'modals.moveFiles.preparation';
  };

  return (
    <Grow in={!timeoutIdAnimation} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div>
          {!(loading || preparing)
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
              values={{ fileCount: translationTitle }}
              components={[<Box fontWeight="600" component="span" />]}
            />
          </Typography>
        </div>
      </div>
    </Grow>
  );
};

MovingProgress.propTypes = {
  closeModal: PropTypes.func.isRequired,
  notificationId: PropTypes.string.isRequired,
};

export default MovingProgress;
