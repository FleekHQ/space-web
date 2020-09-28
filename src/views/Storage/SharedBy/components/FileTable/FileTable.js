import React from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ObjectsTable from '@shared/components/ObjectsTable';

import RenderRow from '../../../shared/RenderRow';
import getTableHeads from '../../../shared/getTableHeads';

const FileTable = ({ bucket, prefix }) => {
  const { t } = useTranslation();

  const rows = useSelector((state) => (
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
      rows={rows}
      heads={getTableHeads(t)}
      renderRow={RenderRow}
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
