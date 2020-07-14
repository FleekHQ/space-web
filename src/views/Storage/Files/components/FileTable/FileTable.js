import React from 'react';
import { useTranslation } from 'react-i18next';
import path from 'path';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import ObjectsTable from '@shared/components/ObjectsTable';
import { addItems } from '@events';
import { objectsSelector } from '@utils';
import { renderRow } from '../../../shared/renderRow';
import getTableHeads from '../../../shared/getTableHeads';

const FileTable = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '') || '';

  const rows = useSelector((state) => (
    /* eslint-disable no-underscore-dangle */
    objectsSelector(
      state,
      '',
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
      renderRow={renderRow}
      withRowOptions
      onDropzoneDrop={onDropzoneDrop}
      getRedirectUrl={(row) => path.join('/storage/files', prefix, row.name)}
    />
  );
};

export default FileTable;
