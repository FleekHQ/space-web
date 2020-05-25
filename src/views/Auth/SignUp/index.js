import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const handleInputChange = ({ setState }) => (event) => {
  const { id, value } = event.target;

  setState((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

const handleSubmit = ({ state }) => (event) => {
  event.preventDefault();

  console.log('TODO: Signup integration', state);
};

const SignUp = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    tfEmail: '',
    tfUsername: '',
  });

  return (
    <div className={classes.root}>
      <img src="/assets/images/auth_logo.svg" alt="space app logo"/>
      <form className={classes.form} onSubmit={handleSubmit({ state })} autoComplete="off">
        <TextField
          id="tfUsername"
          variant="outlined"
          label={t('modules.signup.username')}
          value={state.tfUsername}
          onChange={handleInputChange({ setState })}
          classes={{
            root: classes.textFieldRoot,
          }}
          InputProps={{
            classes: {
              root: classes.inputPropsRoot,
              input: classes.inputPropsInput,
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.inputLabelPropsRoot,
              shrink: classes.inputLabelPropsShrink,
            }
          }}
        />
        <TextField
          id="tfEmail"
          variant="outlined"
          label={t('modules.signup.email')}
          value={state.tfEmail}
          onChange={handleInputChange({ setState })}
          classes={{
            root: classes.textFieldRoot,
          }}
          InputProps={{
            classes: {
              root: classes.inputPropsRoot,
              input: classes.inputPropsInput,
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.inputLabelPropsRoot,
              shrink: classes.inputLabelPropsShrink,
            }
          }}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={!state.tfUsername.length}
          classes={{
            root: classes.buttonRoot,
          }}
        >
          {t('modules.signup.explore')}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
