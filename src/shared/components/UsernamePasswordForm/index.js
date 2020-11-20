import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@terminal-packages/space-ui/core/RainbowField';

import PasswordCheckTooltip from '@shared/components/PasswordCheckTooltip';

import useStyles from './styles';

const UsernamePasswordForm = ({
  onSubmit,
  isLoading,
  onChangeForm,
  submitBtnText,
  defaultUsername,
  defaultPassword,
  showPasswordTooltip,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    username: defaultUsername,
    password: defaultPassword,
    showPassword: false,
    showPasswordTooltip: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      username: state.username,
      password: state.password,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newState = {
      ...state,
      [name]: value,
    };

    setState(newState);
    onChangeForm({
      username: newState.username,
      password: newState.password,
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

  return (
    <form onSubmit={handleSubmit}>
      <Box
        isDark
        mb="23px"
        name="username"
        value={state.username}
        component={RainbowField}
        label={t('common.username')}
        onChange={handleInputChange}
      />
      <PasswordCheckTooltip
        bgColor="secondary"
        tooltipPlacement="bottom"
        password={state.password}
        open={showPasswordTooltip && state.showPasswordTooltip}
      >
        <Box
          isDark
          mb="23px"
          name="password"
          value={state.password}
          component={RainbowField}
          endAdornment={endAdornment}
          label={t('common.password')}
          type={state.showPassword ? 'text' : 'password'}
          onChange={handleInputChange}
          onBlur={handlePasswordTooltipVisibility}
          onFocus={handlePasswordTooltipVisibility}
        />
      </PasswordCheckTooltip>
      <Button
        fullWidth
        type="submit"
        loading={isLoading && state.username.length > 0 && state.password.length > 0}
        classes={{
          disabled: classes.btnDisabled,
        }}
        disabled={isLoading || state.username.length === 0 || state.password.length === 0}
      >
        {submitBtnText}
      </Button>
    </form>
  );
};

UsernamePasswordForm.defaultProps = {
  isLoading: false,
  defaultUsername: '',
  defaultPassword: '',
  onChangeForm: () => null,
  showPasswordTooltip: false,
};

UsernamePasswordForm.propTypes = {
  isLoading: PropTypes.bool,
  onChangeForm: PropTypes.func,
  defaultUsername: PropTypes.string,
  defaultPassword: PropTypes.string,
  showPasswordTooltip: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string.isRequired,
};

export default UsernamePasswordForm;
