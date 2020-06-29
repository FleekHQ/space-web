import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
    if (state.loading) {
      singup({
        email: state.tfEmail,
        username: state.tfUsername,
      });
    }
  }, [state.loading]);

  return (
    <div className={classes.signupRoot}>
      <form className={classes.form} onSubmit={handleSubmit({ dispatch })} autoComplete="off">
        <TextField
          id="tfUsername"
          variant="outlined"
          value={state.tfUsername}
          label={t('modules.signup.username')}
          classes={tfClasses}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
          onChange={handleInputChange({ dispatch })}
        />
        <TextField
          id="tfEmail"
          type="email"
          variant="outlined"
          value={state.tfEmail}
          label={t('modules.signup.email')}
          classes={tfClasses}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
          onChange={handleInputChange({ dispatch })}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={state.loading || !helper.validateForm(state)}
          classes={{
            root: classes.buttonRoot,
          }}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signup.explore')
          }
        </Button>
      </form>
      {
        state.error && (
          <div className={classes.alert}>
            <Typography noWrap color="inherit" variant="body2">
              {t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
            </Typography>
          </div>
        )
      }
    </div>
  );
};

export default SignUp;
