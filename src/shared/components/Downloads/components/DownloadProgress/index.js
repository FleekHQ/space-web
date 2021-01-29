import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { DOWNLOAD_STATES } from '@reducers/downloads';

import useStyles from './styles';

const DownloadProgress = ({
  status,
  progress,
  filename,
  errorMessage,
  onClickDismiss,
}) => {
  const { t } = useTranslation();

  const classes = useStyles({
    progress: progress / 100,
    error: !!errorMessage,
  });

  const isShownDefaultMsg = status === DOWNLOAD_STATES.initializing;

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography variant="body2" className={classes.message}>
          {errorMessage || (
            <Trans
              i18nKey={isShownDefaultMsg
                ? 'downloadProgress.defaultMessage'
                : 'downloadProgress.message'}
              values={{
                filename,
                progress,
              }}
              components={[<Box fontWeight="600" component="span" />]}
            />
          )}
        </Typography>
        <div className={classes.buttons}>
          <Button
            color="secondary"
            className={classes.button}
            onClick={onClickDismiss}
            disableRipple
          >
            {t('downloadProgress.dismiss')}
          </Button>
        </div>
      </div>
      <div className={classes.progressBar} />
    </div>
  );
};

DownloadProgress.defaultProps = {
  progress: 0,
  errorMessage: null,
  status: DOWNLOAD_STATES.initializing,
  filename: '',
  onClickDismiss: () => {},
};

DownloadProgress.propTypes = {
  progress: PropTypes.number,
  errorMessage: PropTypes.string,
  status: PropTypes.string,
  filename: PropTypes.string,
  onClickDismiss: PropTypes.func,
};

export default DownloadProgress;
