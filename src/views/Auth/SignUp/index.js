import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { singup, getPublicKey } from '@events';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import helper from './helper';
import useStyles from './styles';

const handleSubmit = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    type: SIGNUP_ACTION_TYPES.ON_SUBMIT,
  });
};

const handlePasswordVisibility = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    type: SIGNUP_ACTION_TYPES.ON_PASSWORD_CHANGE_VISIBILITY,
  });
};

const handleInputChange = ({ dispatch }) => (event) => {
  const {
    value,
    id: key,
  } = event.target;

  dispatch({
    type: SIGNUP_ACTION_TYPES.ON_INPUT_CHANGE,
    input: {
      key,
      value,
    },
  });
};

const handleInputFocusAndBlur = ({ dispatch }) => (event) => {
  dispatch({
    type: SIGNUP_ACTION_TYPES.ON_INPUT_FOCUS_BLUR,
    input: {
      key: event.target.id,
    },
  });
};

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const state = useSelector((_state) => _state.auth.signup);

  const tfClasses = {
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

  React.useEffect(() => {
    if (state.success) {
      history.push('/storage');
    }
  }, [state.success]);

  React.useEffect(() => {
    if (state.loading && !state.publicKey) {
      getPublicKey();
    } else if (state.publicKey) {
      singup({
        publicKey: state.publicKey,
        username: state.tfUsername.value,
        password: state.tfPassword.value,
      });
    }
  }, [state.loading]);

  React.useEffect(() => {
    if (state.publicKey) {
      singup({
        publicKey: state.publicKey,
        username: state.tfUsername.value,
        password: state.tfPassword.value,
      });
    }
  }, [state.publicKey]);

  React.useEffect(() => {
    let timer;

    if (state.tfUsername.value.length > 0) {
      timer = setTimeout(() => {
        // TODO: verify username
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [state.tfUsername.value]);

  return (
    <div className={classes.signupRoot}>
      <form className={classes.form} onSubmit={handleSubmit({ dispatch })} autoComplete="off">
        <TextField
          fullWidth
          type="text"
          id="tfUsername"
          variant="outlined"
          value={state.tfUsername.value}
          label={t('modules.signup.username')}
          classes={tfClasses}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
          onChange={handleInputChange({ dispatch })}
          onBlur={handleInputFocusAndBlur({ dispatch })}
          onFocus={handleInputFocusAndBlur({ dispatch })}
        />
        <TextField
          fullWidth
          id="tfPassword"
          variant="outlined"
          value={state.tfPassword.value}
          label={t('modules.signup.password')}
          type={state.showPassword ? 'text' : 'password'}
          classes={tfClasses}
          InputLabelProps={InputLabelProps}
          InputProps={{
            ...InputProps,
            endAdornment: (
              <IconButton
                disableRipple
                aria-label="toggle password visibility"
                classes={{
                  root: classes.iconButtonRoot,
                }}
                onClick={handlePasswordVisibility({ dispatch })}
              >
                <FontAwesomeIcon
                  icon={state.showPassword ? faEyeSlash : faEye}
                />
              </IconButton>
            ),
          }}
          onChange={handleInputChange({ dispatch })}
          onBlur={handleInputFocusAndBlur({ dispatch })}
          onFocus={handleInputFocusAndBlur({ dispatch })}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          disabled={state.loading || !helper.formValidation(state)}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signup.title')
          }
        </Button>
        {
          state.error && (
            <div className={classes.alert}>
              <Typography noWrap color="inherit" variant="body2">
                {t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
              </Typography>
            </div>
          )
        }
      </form>
      <Typography
        to="/auth/signin"
        component={Link}
        className={classes.link}
      >
        {t('modules.signup.link')}<span>&nbsp;{t('modules.signin.title')}</span>
      </Typography>
    </div>
  );
};

export default SignUp;
