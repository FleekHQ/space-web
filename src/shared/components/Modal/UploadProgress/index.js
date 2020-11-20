import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Typography from '@ui/Typography';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import { addItems } from '@events/add-items-subscribe';
import classnames from 'classnames';
import useStyles from './styles';

const TRANSITION_TIMEOUT = 300;

const UploadProgress = ({ id, closeModal }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTranslation();
  const state = useSelector((s) => (
    s.storage.uploadsList[id] || {}
  ));
  const { completedFiles = 0, totalFiles = 0, errorMessage } = state;
  const classes = useStyles({
    progress: completedFiles / totalFiles || 0,
    error: !!errorMessage,
  });

  const onClickDismiss = () => {
    if (!timeoutId) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  };

  useEffect(() => {
    if (completedFiles === totalFiles && totalFiles !== 0) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  }, [completedFiles]);

  useEffect(() => () => clearTimeout(timeoutId), []);

  const retry = () => {
    const sourcePaths = Object.entries(state.wasUploaded)
      .filter(([, wasUploaded]) => !wasUploaded)
      .map(([key]) => key);

    addItems({
      sourcePaths,
      targetPath: state.targetPath,
    });
    onClickDismiss();
  };

  const isShownDefaultMsg = completedFiles === 0 && totalFiles === 0;

  return (
    <Grow in={!timeoutId} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div className={classes.info}>
          <Typography variant="body2" className={classes.message}>
            {errorMessage || (
              <Trans
                i18nKey={isShownDefaultMsg
                  ? 'uploadProgressModal.defaultMessage'
                  : 'uploadProgressModal.message'}
                values={{
                  uploadedNumber: completedFiles,
                  totalNumber: totalFiles,
                }}
                components={[<Box fontWeight="600" component="span" />]}
              />
            )}
          </Typography>
          <div className={classes.buttons}>
            {errorMessage && (
              <Button
                color="primary"
                className={classnames(classes.button, classes.tryAgainButton)}
                onClick={retry}
                disableRipple
              >
                {t('uploadProgressModal.retry')}
              </Button>
            )}
            <Button
              color="secondary"
              className={classes.button}
              onClick={onClickDismiss}
              disableRipple
            >
              {t('uploadProgressModal.dismiss')}
            </Button>
          </div>
        </div>
        <div className={classes.progressBar} />
      </div>
    </Grow>
  );
};

UploadProgress.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UploadProgress;
