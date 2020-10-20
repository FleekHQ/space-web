/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ErrorCardButton from '@ui/ErrorCardButton';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const FilesErrors = ({
  bucket,
  fetchObjects,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [errorFileFetch] = useSelector((state) => [
    state.storage.buckets[bucket].error,
  ]);

  const errors = [];

  if (errorFileFetch) {
    errors.push({
      message: t('modules.storage.fileTable.error.message'),
      buttonText: t('modules.storage.fileTable.error.buttonText'),
      buttonOnClick: fetchObjects,
    });
  }

  // TODO: Error open file

  return (
    <>
      {errors.length > 0 && (
        <div className={classes.container}>
          {errors.map((error) => (
            <div className={classes.errorBoxContainer}>
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
