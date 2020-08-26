import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputTooltip from '@ui/InputTooltip';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from '@reducers/auth/restoreKeysMnemonic';
import { restoreKeyPairViaMnemonic } from '@events';
import useStyles from './styles';

const RestoreKeysMnemonic = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.auth.restoreKeysMnemonic);
  const isSuccess = useSelector((_state) => _state.user.publicKey);
  const history = useHistory();
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
    dispatch({ type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT });
    restoreKeyPairViaMnemonic({
      mnemonic: state.mnemonic,
    });
  };

  useEffect(() => {
    dispatch({ type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.CLEAR_STATE });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      history.push('/storage');
    }
  }, [isSuccess]);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
        <InputTooltip
          type="danger"
          bgColor="secondary"
          title={t('modules.restoreKeysMnemonic.keyNotFound')}
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
            value={state.mnemonic}
            label={t('modules.restoreKeysMnemonic.inputLabel')}
            classes={tfClasses}
            InputProps={InputProps}
            disabled={state.loading}
            onChange={(event) => dispatch({
              type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_INPUT_CHANGE,
              payload: event.target.value,
            })}
          />
        </InputTooltip>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          disabled={state.loading || !state.mnemonic}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.restoreKeysMnemonic.submit')
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

export default RestoreKeysMnemonic;
