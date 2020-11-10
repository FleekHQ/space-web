import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';

import BaseModal from '@ui/BaseModal';
import TextField from '@ui/TextField';
import Typography from '@ui/Typography';
import { createFolder } from '@events';
import { CREATE_FOLDER_ACTION_TYPES } from '@reducers/create-folder';

import useStyles from './styles';

const CreateFolder = ({
  path,
  closeModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((s) => s.createFolder);

  const onChange = (event) => {
    dispatch({
      folderName: event.target.value,
      type: CREATE_FOLDER_ACTION_TYPES.ON_INPUT_CHANGE,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    createFolder({
      path,
      folderName: state.folderName,
    });
  };

  React.useEffect(() => (
    () => {
      dispatch({
        type: CREATE_FOLDER_ACTION_TYPES.ON_RESTART,
      });
    }
  ), []);

  React.useEffect(() => {
    if (state.success) {
      closeModal();
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
          {t('modals.createFolder.title')}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.icon}
          />
        </ButtonBase>
      </div>
      <div>
        <form onSubmit={onSubmitForm}>
          <TextField
            fullWidth
            autoFocus
            label={t('modals.createFolder.inputLabel')}
            value={state.folderName}
            onChange={onChange}
            className={classes.textField}
          />
          {state.error && (
            <Typography variant="body2" color="secondary" className={classes.errorMessage}>
              {state.error}
            </Typography>
          )}
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
              type="submit"
              variant="contained"
              disabled={state.loading}
            >
              {
                state.loading ? (
                  <FontAwesomeIcon spin icon={faSpinner} />
                ) : t('common.create')
              }
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

CreateFolder.propTypes = {
  path: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreateFolder;
