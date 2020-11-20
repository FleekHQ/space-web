import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@terminal-packages/space-ui/core/Button';
import RainbowField from '@terminal-packages/space-ui/core/RainbowField';

import InputTooltip from '@ui/InputTooltip';
import { restoreKeyPairViaMnemonic } from '@events';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from '@reducers/auth/restore-keys-mnemonic';

import useStyles from './styles';

const RestoreKeysMnemonic = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.auth.restoreKeysMnemonic);
  const history = useHistory();
  const classes = useStyles({ isError: !!state.error });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT });
    restoreKeyPairViaMnemonic({
      mnemonic: state.mnemonic,
    });
  };

  useEffect(() => (
    () => {
      dispatch({ type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.CLEAR_STATE });
    }
  ), []);

  useEffect(() => {
    if (state.success) {
      history.push('/storage');
    }
  }, [state.success]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mt={0} mb="10px" component="h1" fontSize="24px" color="common.white">
        {t('modules.restoreKeysMnemonic.title')}
      </Box>
      <Box mb="17px" maxWidth={247} fontSize={12} color="common.white">
        {t('modules.restoreKeysMnemonic.description')}
      </Box>
      <Box component="form" mb="10px" onSubmit={onSubmit} autoComplete="off">
        <Box mb="25px">
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
            <RainbowField
              isDark
              autoFocus
              multiline
              rows={4}
              value={state.mnemonic}
              label={t('modules.restoreKeysMnemonic.inputLabel')}
              disabled={state.loading}
              onChange={(event) => dispatch({
                type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_INPUT_CHANGE,
                payload: event.target.value,
              })}
            />
          </InputTooltip>
        </Box>
        <Button
          fullWidth
          type="submit"
          loading={state.loading}
          classes={{
            disabled: classes.btnDisabled,
          }}
          disabled={state.loading || !state.mnemonic}
        >
          {t('modules.signin.title')}
        </Button>
      </Box>
      <Box textAlign="center" color="common.white">
        <Link
          underline="hover"
          to="/auth/forgot-password"
          color="inherit"
          component={NavLink}
        >
          {t('common.goBack')}
        </Link>
      </Box>
    </Box>
  );
};

export default RestoreKeysMnemonic;
