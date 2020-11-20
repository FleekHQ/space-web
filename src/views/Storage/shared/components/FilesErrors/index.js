import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ErrorCardButton from '@ui/ErrorCardButton';
import { useTranslation } from 'react-i18next';

import store from '../../../../../store';
import { SET_OPEN_ERROR_BUCKET } from '../../../../../reducers/storage/bucket';
import useStyles from './styles';

const FilesErrors = ({
  bucket,
  fetchObjects,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [errorFileFetch, openError] = useSelector((state) => [
    state.storage.buckets[bucket].error,
    state.storage.buckets[bucket].openError,
  ]);

  const errors = [];

  if (errorFileFetch) {
    errors.push({
      id: 'fetch-error',
      message: t('modules.storage.fileTable.error.message'),
      buttonText: t('modules.storage.fileTable.error.buttonText'),
      buttonOnClick: fetchObjects,
    });
  }

  if (openError) {
    errors.push({
      id: 'open-error',
      message: t('modules.storage.fileTable.openError.message'),
      buttonText: t('modules.storage.fileTable.openError.buttonText'),
      buttonOnClick: () => {
        store.dispatch({
          payload: {
            bucket,
            error: false,
          },
          type: SET_OPEN_ERROR_BUCKET,
        });
      },
    });
  }

  return (
    <>
      {errors.length > 0 && (
        <div className={classes.container}>
          {errors.map((error) => (
            <div key={error.id} className={classes.errorBoxContainer}>
              <ErrorCardButton
                message={error.message}
                buttonText={error.buttonText}
                buttonOnClick={error.buttonOnClick}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

FilesErrors.propTypes = {
  bucket: PropTypes.string.isRequired,
  fetchObjects: PropTypes.func.isRequired,
};

export default FilesErrors;
