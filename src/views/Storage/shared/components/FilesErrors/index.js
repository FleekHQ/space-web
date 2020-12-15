import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorCard from '@ui/ErrorCard';
import { useSelector } from 'react-redux';
import ErrorCardButton from '@ui/ErrorCardButton';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
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
    });
  }

  return (
    <>
      {errors.length > 0 && (
        <div className={classes.container}>
          {errors.map(({ id, ...errorProps }) => {
            const isOpenError = id === 'open-error';
            const ErrorComponent = isOpenError ? ErrorCard : ErrorCardButton;

            return (
              <div
                key={id}
                className={classnames(
                  classes.errorBoxContainer,
                  isOpenError && classes.openError,
                )}
              >
                <ErrorComponent {...errorProps} />
              </div>
            );
          })}
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
