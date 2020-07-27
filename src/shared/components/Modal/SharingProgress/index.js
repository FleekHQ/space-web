import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@ui/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import useStyles from './styles';

const TRANSITION_TIMEOUT = 300;

const SharingProgress = ({ closeModal }) => {
  // TODO: replace it with reading state from redux (and keep also sharing progress)
  const objects = useSelector((state) => (
    state.storage.buckets.personal.objects.slice(0, 1) || []
  ));
  const isUploaded = false;
  const allFolders = objects.filter((obj) => obj.type === 'folder');

  const classes = useStyles();
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTranslation();

  const onClickDismiss = () => {
    if (!timeoutId) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  }, [isUploaded]);

  useEffect(() => () => clearTimeout(timeoutId), []);

  const translationTitle = objects.length === 1
    ? objects[0].name
    : `${t(
      'detailsPanel.foldersNumber',
      { count: allFolders.length },
    )}, ${t(
      'detailsPanel.filesNumber',
      { count: objects.length - allFolders.length },
    )}`;

  return (
    <Grow in={!timeoutId} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div>
          {isUploaded
            ? <FontAwesomeIcon icon={faCheckCircle} className={classes.icon} />
            : <CircularProgress size={14} className={classes.loader} />}
          <Typography variant="body1" weight="medium" component="span">
            <Trans
              i18nKey={
                `sharingProgressModal.${isUploaded ? 'message' : 'inProgress'}`
              }
              values={{ fileName: translationTitle }}
              components={[<Box fontWeight="600" component="span" />]}
            />
          </Typography>
        </div>
        <Button
          color="secondary"
          className={classes.button}
          onClick={onClickDismiss}
          disableRipple
        >
          {t('sharingProgressModal.dismiss')}
        </Button>
      </div>
    </Grow>
  );
};

SharingProgress.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SharingProgress;
