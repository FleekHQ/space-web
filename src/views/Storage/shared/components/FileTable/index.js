import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import path from 'path';
import { useSelector } from 'react-redux';
import ObjectsTable from '@shared/components/ObjectsTable';
import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { renderRow } from '../../renderRow';
import getTableHeads from '../../getTableHeads';

const FileTable = (props) => {
  const { bucket, prefix } = props;
  const { t } = useTranslation();

  const rows = useSelector((state) => (
    /* eslint-disable no-underscore-dangle */
    objectsSelector(
      state,
      bucket,
      prefix,
      '/',
    )
  ));

  const onDropzoneDrop = (files) => {
    addItems({
      targetPath: prefix,
      sourcePaths: files.map((file) => file.path),
    });
  };

  return (
    <ObjectsTable
      bucket={bucket}
      rows={rows}
      heads={getTableHeads(t)}
      renderRow={renderRow}
      withRowOptions
      onDropzoneDrop={onDropzoneDrop}
      getRedirectUrl={(row) => path.join('/storage/files', prefix, row.name)}
    />
  );
};

FileTable.propTypes = {
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default FileTable;
