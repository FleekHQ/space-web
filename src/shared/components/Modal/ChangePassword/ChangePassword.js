import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const ChangePassword = (props) => {
  const { closeModal, confirm } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState({
    newPassword: '',
    confirmPassword: '',
    error: 'error',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    confirm(state);
  };

  return (
    <BaseModal
      paperProps={{
        className: classes.root,
      }}
    >
      <Paper className={classes.modalContent}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" weight="medium">
            {t('modals.changePassword.title')}
          </Typography>
          <ButtonBase onClick={closeModal} disableRipple>
            <FontAwesomeIcon
              icon={faTimes}
              className={classes.closeIcon}
            />
          </ButtonBase>
        </div>
        <form onSubmit={onSubmit} className={classes.bodyContainer}>
          <TextField
            inputProps={{
              autocomplete: 'new-password',
            }}
            className={classes.row}
            label={t('modals.changePassword.newPassword')}
            variant="outlined"
            type="password"
            value={state.newPassword}
            onChange={(event) => setState({
              ...state,
              newPassword: event.target.value,
            })}
          />
          <TextField
            inputProps={{
              autocomplete: 'off',
            }}
            className={classes.row}
            label={t('modals.changePassword.confirmPassword')}
            variant="outlined"
            type="password"
            value={state.confirmPassword}
            onChange={(event) => setState({
              ...state,
              confirmPassword: event.target.value,
            })}
          />
          <div className={`${classes.footer} ${classes.row}`}>
            <Button onClick={closeModal} variant="outlined" color="secondary">
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className={classes.confirmBtn}
              variant="contained"
            >
              {t('common.confirm')}
            </Button>
          </div>
        </form>
      </Paper>
      <Typography className={classes.error} variant="body2">
        {state.error}
      </Typography>
    </BaseModal>
  );
};

ChangePassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ChangePassword;
