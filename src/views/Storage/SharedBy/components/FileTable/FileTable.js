import React from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ObjectsTable from '@shared/components/ObjectsTable';
import renderLoadingRows from '../../../shared/render-loading-rows';
import RenderRow from '../../../shared/RenderRow';

import getTableHeads from '../../../shared/getTableHeads';

const FileTable = ({ bucket, prefix }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [rows, loading] = useSelector((state) => [
    objectsSelector(
      state,
      bucket,
      prefix,
      '/',
    ),
    state.storage.loading,
  ]);

  // NOTE: this function receives as first argument the "files", and as a second the "target"
  const onDropzoneDrop = (files) => {
    const targetPath = ''; // NOTE: on shared with me view, we default target to root directory

    const sourcePaths = files.map((file) => ({
      name: file.name,
      size: file.size,
      data: new File([file], file.name, { type: file.type, lastModified: file.lastModified }),
      mimeType: file.type,
      path: file.path.replace(/^\//, ''),
    }));

    dispatch(addItems({
      targetPath,
      sourcePaths,
    }));
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
