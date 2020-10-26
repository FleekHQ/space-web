import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import RainbowField from '@terminal-packages/space-ui/core/RainbowField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';

import { signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';

import useStyles from './styles';

const UsernameSignin = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const siginState = useSelector((s) => s.auth.signin);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  React.useEffect(() => {
    if (siginState.success) {
      history.push('/storage');
    }
  }, [siginState.success]);

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  const endAdornment = (
    <InputAdornment position="end" className={classes.adornment}>
      <IconButton
        onClick={handleShowPassword}
        className={classes.iconButton}
        onMouseDown={(e) => e.preventDefault()}
      >
        {showPassword ? (
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

  const onSubmit = (e) => {
    e.preventDefault();

    signin({ username, password });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <RainbowField
          isDark
          label={t('modules.signin.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <RainbowField
          isDark
          value={password}
          label={t('modules.signin.password')}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={endAdornment}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submitButton}
          disabled={username.length === 0 || password.length === 0 || siginState.loading}
        >
          {
            siginState.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signin.title')
          }
        </Button>
      </form>
      {
        siginState.error && (
          <div className={classes.alert}>
            <Typography color="inherit" variant="body2">
              {t(siginState.error, { defaultValue: t('modules.signin.errors.generic') })}
            </Typography>
          </div>
        )
      }
      <Link
        to="/auth/restore-keys-mnemonic"
        className={classes.forgotPasswordLink}
      >
        {t('modules.signin.recover')}
      </Link>
      <Typography
        color="inherit"
        to="/auth/signup"
        component={Link}
        className={classes.signUplink}
      >
        {t('modules.signin.link')}<strong>&nbsp;{t('modules.signup.title')}</strong>
      </Typography>
    </div>
  );
};

export default UsernameSignin;
