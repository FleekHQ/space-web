import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { testKeys } from '@events';
import { USER_ACTION_TYPES } from '@reducers/user';
import { SIGNOUT_ACTION_TYPES } from '@reducers/auth/signout';

import useStyles from './styles';

const SignoutConfirmation = ({ closeModal }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const { user, signoutState } = useSelector((s) => ({
    user: s.user,
    signoutState: s.auth.signout,
  }));

  React.useEffect(() => {
    if (signoutState.success) {
      closeModal();

      dispatch({
        type: USER_ACTION_TYPES.ON_USER_LOGOUT,
      });
    }
  }, [signoutState.success]);

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT_RESET,
      });
    }
  ), []);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <div className={classes.header}>
        <Typography variant="h6">
          {t('modals.signoutConfirmation.title')}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.icon}
          />
        </ButtonBase>
      </div>
      <Typography variant="body1">
        {t('modals.signoutConfirmation.description')}
      </Typography>
      <Box my={2}>
        <form
          id="password-form"
          onSubmit={() => testKeys({
            uuid: user.uuid,
            passphrase: password,
          })}
        >
          <TextField
            fullWidth
            type="password"
            value={password}
            variant="outlined"
            label={t('modals.signoutConfirmation.passwordLabel')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </Box>
      {
        signoutState.error && (
          <Typography className={classes.error} variant="body2">
            {signoutState.error}
          </Typography>
        )
      }
      <div className={classes.buttonContainer}>
        <Button
          onClick={closeModal}
          color="secondary"
          variant="outlined"
          disabled={signoutState.loading}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          form="password-form"
          disabled={signoutState.loading}
          onClick={() => testKeys({
            uuid: user.uuid,
            passphrase: password,
          })}
        >
          {
            signoutState.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} />
            ) : t('common.confirm')
          }
        </Button>
      </div>
    </BaseModal>
  );
};

SignoutConfirmation.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SignoutConfirmation;
