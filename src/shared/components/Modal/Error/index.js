import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { useTranslation, Trans } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import useStyles from './styles';

const TRANSITION_TIMEOUT = 300;

const ErrorModal = ({ closeModal, i18nKey, i18nValues }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTranslation();

  const classes = useStyles();

  const onClickDismiss = () => {
    if (!timeoutId) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  };

  useEffect(() => () => clearTimeout(timeoutId), []);

  return (
    <Grow in={!timeoutId} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div className={classes.info}>
          <Typography variant="body2">
            <Trans
              i18nKey={i18nKey}
              values={i18nValues}
              components={[<Box fontWeight="600" component="span" />]}
            />
          </Typography>
          <Button
            color="secondary"
            className={classes.button}
            onClick={onClickDismiss}
            disableRipple
          >
            {t('uploadProgressModal.dismiss')}
          </Button>
        </div>
        <div className={classes.progressBar} />
      </div>
    </Grow>
  );
};

ErrorModal.defaultProps = {
  i18nValues: {},
};

ErrorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  i18nKey: PropTypes.string.isRequired,
  i18nValues: PropTypes.shape({}),
};

export default ErrorModal;
