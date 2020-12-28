import React from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ObjectsTable from '@shared/components/ObjectsTable';
import renderLoadingRows from '../../../shared/render-loading-rows';
import RenderRow from '../../../shared/RenderRow';

import getTableHeads from '../../../shared/getTableHeads';

const FileTable = ({ bucket, prefix }) => {
  const { t } = useTranslation();

  const [rows, loading] = useSelector((state) => [
    objectsSelector(
      state,
      bucket,
      prefix,
      '/',
    ),
    state.storage.loading,
  ]);

  const onDropzoneDrop = (files, target) => {
    addItems({
      targetPath: target || prefix,
      sourcePaths: files.map((file) => file.path),
    });
  };

  return (
    <ObjectsTable
      rows={rows}
      heads={getTableHeads(t)}
      renderRow={RenderRow}
      renderLoadingRows={renderLoadingRows}
      loading={loading}
      withRowOptions={false}
      onDropzoneDrop={onDropzoneDrop}
      getRedirectUrl={(row) => path.posix.join('/storage/files', prefix, row.name)}
    />
  );
};

FileTable.propTypes = {
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default FileTable;
