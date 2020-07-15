import React from 'react';
import { useTranslation } from 'react-i18next';
import path from 'path';
import get from 'lodash/get';
import { matchPath, useLocation } from 'react-router-dom';
import ObjectsTable from '@shared/components/ObjectsTable';
import { renderRow } from '../../../shared/renderRow';
import getTableHeads from '../../../shared/getTableHeads';

const BucketsTable = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '') || '';

  const rows = [
    {
      type: 'folder',
      ext: 'folder',
      name: 'Bucket A',
      id: 'a',
      lastModified: new Date(),
      size: 100000,
    },
    {
      type: 'folder',
      ext: 'folder',
      name: 'Bucket B',
      id: 'b',
      lastModified: new Date(),
      size: 200000,
    },
  ];

  return (
    <ObjectsTable
      rows={rows}
      heads={getTableHeads(t)}
      renderRow={renderRow}
      withRowOptions
      getRedirectUrl={(row) => path.join(
        '/storage/shared-with-me',
        prefix,
        row.id,
      )}
    />
  );
};

export default BucketsTable;
