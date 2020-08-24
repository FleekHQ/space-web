import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import InputTooltip from '@ui/InputTooltip';
import { singup } from '@events';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import helper from './helper';
import useStyles from './styles';

const handleSubmit = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    type: SIGNUP_ACTION_TYPES.ON_SUBMIT,
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
  const state = useSelector((s) => s.auth.signup);

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
    if (state.loading) {
      singup({
        username: state.tfUsername.value,
      });
    }
  }, [state.loading]);

  // keep this in case we need to validate username on key press
  /* React.useEffect(() => {
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
  }, [state.tfUsername.value]); */

  return (
    <div className={classes.signupRoot}>
      <form className={classes.form} onSubmit={handleSubmit({ dispatch })} autoComplete="off">
        <InputTooltip
          type="danger"
          bgColor="secondary"
          title={t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
          tooltip={{
            arrow: true,
            open: !!state.error,
            placement: 'right-start',
          }}
        >
          <TextField
            fullWidth
            type="text"
            id="tfUsername"
            variant="outlined"
            error={state.error}
            value={state.tfUsername.value}
            label={t('modules.signup.username')}
            classes={tfClasses}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            onChange={handleInputChange({ dispatch })}
            onBlur={handleInputFocusAndBlur({ dispatch })}
            onFocus={handleInputFocusAndBlur({ dispatch })}
          />
        </InputTooltip>
        <Typography
          id="tfUsername-helperText"
          variant="body2"
          color="secondary"
        >
          {t('modules.signup.helperText')}
        </Typography>
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
            ) : t('modules.signup.claim')
          }
        </Button>
        <Button
          fullWidth
          type="button"
          variant="outlined"
          disabled={state.loading}
          classes={{ root: classes.buttonContained }}
        >
          {t('modules.signup.doLater')}
        </Button>
      </form>
      <Typography
        to="/auth/signin"
        component={Link}
        className={classes.link}
      >
        {t('modules.signup.link')}<span>&nbsp;{t('modules.signup.logIn')}</span>
      </Typography>
    </div>
  );
};

export default SignUp;
