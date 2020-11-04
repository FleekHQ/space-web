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
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    currentPassword: {
      value: '',
      showPassword: false,
    },
    confirmPassword: {
      value: '',
      showPassword: false,
    },
    newPassword: {
      value: '',
      isFocus: false,
      showPassword: false,
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

  const handlePasswordVisibility = (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      [event.currentTarget.id]: {
        ...prevState[event.currentTarget.id],
        showPassword: !prevState[event.currentTarget.id].showPassword,
      },
    }));
  };

  const endAdornment = (id) => (
    <InputAdornment position="end" className={classes.adornment}>
      <IconButton
        id={id}
        disabled={changePassword.loading}
        onClick={handlePasswordVisibility}
        className={classes.iconButton}
        onMouseDown={(e) => e.preventDefault()}
      >
        {!state[id].showPassword ? (
          <FontAwesomeIcon
            icon={faEye}
            className={classes.icon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={classes.icon}
          />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <BaseModal
      paperProps={{
        className: classes.root,
      }}
    >
      <Paper className={classes.modalContent}>
        <ButtonBase
          onClick={() => closeModal()}
          className={classes.closeButton}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.closeIcon}
          />
        </ButtonBase>
        <img className={classes.logo} src={`${process.env.PUBLIC_URL}/icon.png`} alt="space logo" />
        <Typography
          variant="h6"
          weight="medium"
          className={classes.title}
        >
          {t('modals.changePassword.title')}
        </Typography>
        <form onSubmit={onSubmit} className={classes.bodyContainer}>
          <TextField
            InputProps={{
              endAdornment: endAdornment('currentPassword'),
            }}
            className={classes.row}
            label={t('modals.changePassword.currentPassword')}
            variant="outlined"
            type={state.currentPassword.showPassword ? 'text' : 'password'}
            value={state.currentPassword.value}
            onChange={(event) => setState({
              ...state,
              currentPassword: {
                ...state.currentPassword,
                value: event.target.value,
              },
            })}
          />
          <PasswordCheckTooltip
            open={state.newPassword.isFocus}
            password={state.newPassword.value}
            bgColor="secondary"
          >
            <TextField
              fullWidth
              InputProps={{
                endAdornment: endAdornment('newPassword'),
              }}
              className={classes.row}
              label={t('modals.changePassword.newPassword')}
              variant="outlined"
              type={state.newPassword.showPassword ? 'text' : 'password'}
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
            InputProps={{
              endAdornment: endAdornment('confirmPassword'),
            }}
            className={classes.row}
            label={t('modals.changePassword.confirmPassword')}
            variant="outlined"
            type={state.confirmPassword.showPassword ? 'text' : 'password'}
            value={state.confirmPassword.value}
            onChange={(event) => setState({
              ...state,
              confirmPassword: {
                ...state.confirmPassword,
                value: event.target.value,
              },
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
              color="primary"
              className={classes.confirmBtn}
              disabled={(
                !helper.verifyFormValidation(state.newPassword.value, state.confirmPassword.value)
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
