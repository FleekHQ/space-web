import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@terminal-packages/space-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import { deleteObject } from '@events';
import { openModal, DELETE_OBJECT_SUCCESS } from '@shared/components/Modal/actions';
import { DELETE_OBJECT_AND_CHILDREN } from '@reducers/storage/bucket';

import { DELETE_OBJECT_ACTION_TYPES } from '@reducers/delete-object';
import useStyles from './styles';

const DeleteFile = ({
  item,
  closeModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const state = useSelector((s) => s.deleteObject);
  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();
    deleteObject({
      bucket: item.bucket,
      path: `/${item.key}`,
    });
  };

  React.useEffect(() => (
    () => {
      dispatch({
        type: DELETE_OBJECT_ACTION_TYPES.ON_RESTART,
      });
    }
  ), []);

  React.useEffect(() => {
    if (state.success) {
      dispatch(openModal(DELETE_OBJECT_SUCCESS, { isFile: item.type === 'file' }));
      dispatch({
        type: DELETE_OBJECT_AND_CHILDREN,
        payload: {
          fullKey: item.fullKey,
          bucket: item.bucket,
        },
      });
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
        <Typography variant="h6" className={classes.title}>
          {t('modals.deleteObject.title')}
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
          <Typography className={classes.description}>
            {t('modals.deleteObject.description', {
              filename: item.name,
            })}
          </Typography>
          {state.error && (
            <Typography variant="body2" color="secondary" className={classes.errorMessage}>
              {t('modals.deleteObject.description')}
            </Typography>
          )}
          <div className={classes.buttonContainer}>
            <Button
              onClick={closeModal}
              variant="secondary"
              disabled={state.loading}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={state.loading}
              className={classes.button}
            >
              {
                state.loading ? (
                  <FontAwesomeIcon spin icon={faSpinner} />
                ) : t('common.delete')
              }
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

DeleteFile.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    bucket: PropTypes.string,
    key: PropTypes.string,
    type: PropTypes.string,
    fullKey: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DeleteFile;
