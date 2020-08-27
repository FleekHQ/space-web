import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { backupKeysByPassphrase } from '@events';
import { CHANGE_PASSWORD_ACTION_TYPES } from '@reducers/change-password';
import PasswordCheckTooltip from '@shared/components/PasswordCheckTooltip';

import helper from './helper';
import useStyles from './styles';

const ChangePassword = (props) => {
  const { closeModal } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user, changePassword } = useSelector((s) => ({
    user: s.user,
    changePassword: s.changePassword,
  }));
  const [state, setState] = React.useState({
    confirmPassword: '',
    newPassword: {
      value: '',
      isFocus: false,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    backupKeysByPassphrase({
      uuid: user.uuid,
      passphrase: state.newPassword.value,
    });
  };

  React.useEffect(() => (
    () => {
      dispatch({
        type: CHANGE_PASSWORD_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  React.useEffect(() => {
    if (changePassword.success) {
      closeModal();
    }
  }, [changePassword.success]);

  return (
    <BaseModal
      paperProps={{
        className: classes.root,
      }}
    >
      <Paper className={classes.modalContent}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" weight="medium">
            {t('modals.changePassword.title')}
          </Typography>
          <ButtonBase disableRipple onClick={() => closeModal()}>
            <FontAwesomeIcon
              icon={faTimes}
              className={classes.closeIcon}
            />
          </ButtonBase>
        </div>
        <form onSubmit={onSubmit} className={classes.bodyContainer}>
          <PasswordCheckTooltip
            open={state.newPassword.isFocus}
            password={state.newPassword.value}
          >
            <TextField
              className={classes.row}
              label={t('modals.changePassword.newPassword')}
              variant="outlined"
              type="password"
              value={state.newPassword.value}
              onFocus={() => setState({
                ...state,
                newPassword: {
                  ...state.newPassword,
                  isFocus: true,
                },
              })}
              onBlur={() => setState({
                ...state,
                newPassword: {
                  ...state.newPassword,
                  isFocus: false,
                },
              })}
              onChange={(event) => setState({
                ...state,
                newPassword: {
                  ...state.newPassword,
                  value: event.target.value,
                },
              })}
            />
          </PasswordCheckTooltip>
          <TextField
            className={classes.row}
            label={t('modals.changePassword.confirmPassword')}
            variant="outlined"
            type="password"
            value={state.confirmPassword}
            onChange={(event) => setState({
              ...state,
              confirmPassword: event.target.value,
            })}
          />
          <div className={`${classes.footer} ${classes.row}`}>
            <Button
              variant="outlined"
              color="secondary"
              disabled={changePassword.loading}
              onClick={() => closeModal()}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={classes.confirmBtn}
              disabled={(
                !helper.verifyFormValidation(state.newPassword.value, state.confirmPassword)
                || changePassword.loading
              )}
            >
              {
                changePassword.loading ? (
                  <FontAwesomeIcon spin icon={faSpinner} />
                ) : t('common.confirm')
              }
            </Button>
          </div>
        </form>
      </Paper>
      {
        changePassword.error && (
          <Typography className={classes.error} variant="body2">
            {changePassword.error}
          </Typography>
        )
      }
    </BaseModal>
  );
};

ChangePassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangePassword;
