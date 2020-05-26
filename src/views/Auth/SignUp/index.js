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

  const tfClasses = {
    root: classes.textFieldRoot,
  };

  const InputProps = {
    classes: {
      root: classes.inputPropsRoot,
      input: classes.inputPropsInput,
    }
  };

  const InputLabelProps = {
    classes: {
      root: classes.inputLabelPropsRoot,
      shrink: classes.inputLabelPropsShrink,
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit({ state })} autoComplete="off">
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
        disabled={!state.tfUsername.length}
        classes={{
          root: classes.buttonRoot,
        }}
      >
        {t('modules.signup.explore')}
      </Button>
    </form>
  );
};

export default SignUp;
