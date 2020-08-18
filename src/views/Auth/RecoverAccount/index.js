import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputTooltip from '@ui/InputTooltip';

import useStyles from './styles';

const RecoverAccount = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const [state, setState] = useState({
    key: '',
    error: null,
    loading: false,
  });
  const classes = useStyles({ isError: !!state.error });
  const tfClasses = {
    root: classes.textFieldRoot,
  };
  const InputProps = {
    classes: {
      multiline: classes.inputPropsMultiline,
    },
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    // pretend sending data to BE
    setTimeout(() => {
      setState({
        ...state,
        loading: false,
        error: t('modules.recoverAccount.keyNotFound'),
      });
    }, 2000);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
        <InputTooltip
          type="danger"
          bgColor="secondary"
          title={state.error}
          tooltip={{
            arrow: true,
            open: !!state.error,
            placement: 'right',
          }}
        >
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={state.key}
            label={t('modules.recoverAccount.inputLabel')}
            classes={tfClasses}
            InputProps={InputProps}
            onChange={(event) => setState({
              ...state,
              key: event.target.value,
              error: null,
            })}
            disabled={state.loading}
          />
        </InputTooltip>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          disabled={state.loading || !state.key}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.recoverAccount.submit')
          }
        </Button>
      </form>
      <Typography
        color="inherit"
        to="/auth/signup"
        component={Link}
        className={classes.link}
      >
        {t('modules.signin.link')}<strong>&nbsp;{t('modules.signup.title')}</strong>
      </Typography>
    </div>
  );
};

export default RecoverAccount;
