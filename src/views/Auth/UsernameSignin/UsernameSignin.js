import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';

import useStyles from './styles';

const UsernameSignin = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const textFieldClasses = {
    root: classes.textFieldRoot,
  };

  const InputProps = {
    classes: {
      root: classes.inputPropsRoot,
      input: classes.inputPropsInput,
    },
  };

  const InputLabelProps = {
    classes: {
      root: classes.inputLabelPropsRoot,
      shrink: classes.inputLabelPropsShrink,
    },
  };

  const endAdornment = (
    <InputAdornment position="end">
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

  /* eslint-disable no-console */
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          label={t('modules.signin.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          classes={textFieldClasses}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
        />
        <TextField
          value={password}
          variant="outlined"
          label={t('modules.signin.password')}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          classes={textFieldClasses}
          InputLabelProps={InputLabelProps}
          InputProps={{
            endAdornment,
            ...InputProps,
          }}
        />
        <Button
          fullWidth
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.submitButton}
        >
          {t('modules.signin.title')}
        </Button>
      </form>
      <Link
        to="/auth/forgot-password"
        className={classes.forgotPasswordLink}
      >
        {t('modules.signup.forgotPassword')}
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
