import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { USER_ACTION_TYPES } from '@reducers/user';

import useStyles from './styles';

const handleInputChange = ({ setState }) => (event) => {
  const { id, value } = event.target;

  setState((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

const handleSubmit = ({
  state,
  history,
  dispatch,
}) => (event) => {
  event.preventDefault();

  dispatch({
    type: USER_ACTION_TYPES.ON_USER_SIGNUP,
    user: {
      email: state.tfEmail,
      username: state.tfUsername,
    },
  });

  history.push('/storage');
};

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    loading: false,
    tfEmail: '',
    tfUsername: '',
  });

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
    if (state.error) {
      /* eslint-disable-next-line no-console */
      console.error(`Signup error: ${state.error}`);
    }
  }, [state.error]);

  return (
    <form className={classes.form} onSubmit={handleSubmit({ state, history, dispatch })} autoComplete="off">
      <TextField
        id="tfUsername"
        variant="outlined"
        value={state.tfUsername}
        label={t('modules.signup.username')}
        classes={tfClasses}
        InputProps={InputProps}
        InputLabelProps={InputLabelProps}
        onChange={handleInputChange({ setState })}
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
        onChange={handleInputChange({ setState })}
      />
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={!state.tfUsername.length || state.loading}
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
  );
};

export default SignUp;
