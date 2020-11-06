import React, { useState } from 'react';

import { createUsernameAndPassword } from '@events';
import { useDispatch, useSelector } from 'react-redux';
import PasswordCheckTooltip from '@shared/components/PasswordCheckTooltip';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';
import BaseModal from '@ui/BaseModal';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { USER_ACTION_TYPES } from '@reducers/user';
import { PASSWORD_REGEX } from '@shared/components/Modal/ChangePassword/helper';

import useStyles from './styles';

const CreateUsernamePassword = ({
  closeModal,
  setError,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = useState(false);
  const userState = useSelector((s) => s.user);

  React.useEffect(() => {
    if (userState.creatingUsernameAndPasswordError === 'modules.signup.errors.username') {
      setUsernameError(true);
      return;
    }
    if (userState.creatingUsernameAndPasswordError) {
      setError(true);
    }
    if (
      userState.creatingUsernameAndPasswordSuccess
      || userState.creatingUsernameAndPasswordError
    ) {
      closeModal();
    }
  }, [userState.creatingUsernameAndPasswordSuccess, userState.creatingUsernameAndPasswordError]);

  React.useEffect(() => (
    () => {
      dispatch({
        type: USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_RESET,
      });
    }
  ), []);

  const [state, setState] = React.useState({
    username: '',
    password: '',
    showPassword: false,
    showPasswordTooltip: false,
  });

  const handleInputChange = (event) => {
    setUsernameError(false);
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handlePasswordVisibility = (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handlePasswordTooltipVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showPasswordTooltip: !prevState.showPasswordTooltip,
    }));
  };

  const endAdornment = (
    <InputAdornment position="end" className={classes.adornment}>
      <IconButton
        disabled={userState.creatingUsernameAndPassword}
        onClick={handlePasswordVisibility}
        className={classes.iconButton}
        onMouseDown={(e) => e.preventDefault()}
      >
        {!state.showPassword ? (
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

  const handleUsernamePasswordFormSubmit = () => {
    createUsernameAndPassword({
      username: state.username,
      password: state.password,
    });
  };

  const isPasswordValid = PASSWORD_REGEX.test(state.password);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <ButtonBase onClick={closeModal} className={classes.closeButton}>
        <FontAwesomeIcon
          icon={faTimes}
          className={classes.closeIcon}
        />
      </ButtonBase>
      <img className={classes.logo} src={`${process.env.PUBLIC_URL}/icon.png`} alt="space logo" />
      <Typography className={classes.title}>
        {t('modals.createUsernamePassword.title')}
      </Typography>

      <form onSubmit={handleUsernamePasswordFormSubmit} className={classes.form}>
        <TextField
          fullWidth
          autoFocus
          name="username"
          label={t('common.username')}
          value={state.username}
          onChange={handleInputChange}
          className={classes.username}
        />
        {usernameError && (
          <div className={classes.errorContainer}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={classes.errorIcon}
            />
            <Typography className={classes.errorMessage}>
              {t('modals.createUsernamePassword.usernameError')}
            </Typography>
          </div>
        )}
        <PasswordCheckTooltip
          bgColor="secondary"
          tooltipPlacement="bottom"
          password={state.password}
          open={state.showPasswordTooltip}
        >
          <TextField
            InputProps={{
              endAdornment,
            }}
            fullWidth
            name="password"
            value={state.password}
            label={t('common.password')}
            type={state.showPassword ? 'text' : 'password'}
            onChange={handleInputChange}
            onBlur={handlePasswordTooltipVisibility}
            onFocus={handlePasswordTooltipVisibility}
          />
        </PasswordCheckTooltip>
        <div className={classes.buttonContainer}>
          <Button
            onClick={closeModal}
            color="secondary"
            variant="outlined"
            disabled={userState.creatingUsernameAndPassword}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleUsernamePasswordFormSubmit}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            // eslint-disable-next-line max-len
            disabled={userState.creatingUsernameAndPassword || state.username.length === 0 || !isPasswordValid}
          >
            {
              userState.creatingUsernameAndPassword ? (
                <FontAwesomeIcon spin icon={faSpinner} />
              ) : t('common.create')
            }
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

CreateUsernamePassword.defaultProps = {
  setError: () => {},
};

CreateUsernamePassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setError: PropTypes.func,
};

export default CreateUsernamePassword;
