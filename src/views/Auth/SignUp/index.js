import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { singup } from '@events';
import InputTooltip from '@ui/InputTooltip';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import helper from './helper';
import useStyles from './styles';

const handleSubmit = ({ username }) => (event) => {
  event.preventDefault();

  singup({ username });
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

const handleDoThisLater = (event) => {
  event.preventDefault();

  singup();
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

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNUP_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  return (
    <div className={classes.signupRoot}>
      <form className={classes.form} onSubmit={handleSubmit({ username: state.tfUsername.value })} autoComplete="off">
        <InputTooltip
          type="danger"
          bgColor="secondary"
          title={t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
          tooltip={{
            arrow: true,
            placement: 'right-start',
            // Only open tooltip for username error
            open: !!state.error && state.error.includes('username'),
          }}
        >
          <TextField
            fullWidth
            type="text"
            id="tfUsername"
            variant="outlined"
            value={state.tfUsername.value}
            error={state.error && state.error.includes('username')}
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
          id="claim-btn"
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          disabled={state.loading || !helper.formValidation(state) || state.loadingLater}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signup.claim')
          }
        </Button>
        <Button
          fullWidth
          id="do-this-later-btn"
          type="button"
          variant="outlined"
          disabled={state.loading || state.loadingLater}
          classes={{ root: classes.buttonContained }}
          onClick={handleDoThisLater}
        >
          {
            state.loadingLater ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signup.doLater')
          }
        </Button>
        {
          state.error && !state.error.includes('username') && (
            <div className={classes.alert}>
              <Typography color="inherit" variant="body2">
                {t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
              </Typography>
            </div>
          )
        }
      </form>
      <Typography
        to="/auth/signin/username"
        component={Link}
        className={classes.link}
      >
        {t('modules.signup.link')}<span>&nbsp;{t('modules.signup.logIn')}</span>
      </Typography>
    </div>
  );
};

export default SignUp;
