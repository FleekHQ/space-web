import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { deleteAccount } from '@events';
import { USER_ACTION_TYPES } from '@reducers/user';

import useStyles from './styles';

const DeleteAccountConfirmation = ({
  closeModal,
  closeMainModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((s) => s.deleteAccount);

  React.useEffect(() => {
    if (state.success) {
      closeModal();
      closeMainModal();

      dispatch({
        type: USER_ACTION_TYPES.ON_USER_LOGOUT,
      });
    }
  }, [state.success]);

  return (
    <BaseModal
      onClose={closeModal}
      paperProps={{
        className: classes.root,
      }}
    >
      <div className={classes.header}>
        <Typography variant="h6">
          {t('modals.deleteAccount.title')}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.icon}
          />
        </ButtonBase>
      </div>
      <Typography variant="body1">
        {t('modals.deleteAccount.description')}
      </Typography>
      {
        state.error && (
          <Typography className={classes.error} variant="body2">
            {state.error}
          </Typography>
        )
      }
      <div className={classes.buttonContainer}>
        <Button
          onClick={closeModal}
          color="secondary"
          variant="outlined"
          disabled={state.loading}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={state.loading}
          onClick={() => deleteAccount()}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} />
            ) : t('common.yes')
          }
        </Button>
      </div>
    </BaseModal>
  );
};

DeleteAccountConfirmation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  closeModal: PropTypes.func.isRequired,
  closeMainModal: PropTypes.func.isRequired,
};

export default DeleteAccountConfirmation;
