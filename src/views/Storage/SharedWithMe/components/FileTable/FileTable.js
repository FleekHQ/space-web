import React from 'react';
import { useTranslation } from 'react-i18next';
import path from 'path';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import ObjectsTable from '@shared/components/ObjectsTable';
import Typography from '@material-ui/core/Typography';
import { addItems, fetchObjects } from '@events';
import { formatBytes, objectsSelector, formatDate } from '@utils';
import { TableCell, FileCell } from '@ui/Table';

const renderRow = (row) => (
  <>
    <FileCell ext={row.ext} src={`file:${row.key}`}>
      <Typography variant="body1" noWrap>
        {row.name}
      </Typography>
    </FileCell>
    <TableCell>
      <Typography variant="body1" color="secondary" noWrap>
        {formatBytes(row.size)}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body1" color="secondary" noWrap>
        {/* {moment(row.lastModified).format('MMM d, YYYY hh:mm:ss A z')} */}
        {/* ^ just for testing, after POC should be used line below */}
        {formatDate(row.lastModified)}
      </Typography>
    </TableCell>
  </>
);

const FileTable = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '') || '';

  React.useEffect(() => {
    fetchObjects();
  }, []);

  const { rows, heads } = useSelector((state) => {
    /* eslint-disable no-underscore-dangle */
    const _rows = objectsSelector(
      state,
      '',
      prefix,
      '/',
    );

    return {
      rows: _rows,
      heads: [
        {
          width: '41%',
          title: t('modules.storage.fileTable.head.name'),
        },
        {
          width: '29%',
          title: t('modules.storage.fileTable.head.members'),
        },
        {
          title: t('modules.storage.fileTable.head.lastModified'),
        },
      ],
    };
  });

  const onDropzoneDrop = (files) => {
    addItems({
      targetPath: prefix,
      sourcePaths: files.map((file) => file.path),
    });
  };

  return (
    <ObjectsTable
      rows={rows}
      heads={heads}
      renderRow={renderRow}
      withRowOptions
      onDropzoneDrop={onDropzoneDrop}
      getRedirectUrl={(rowName) => path.join('/storage/files', prefix, rowName)}
    />
  );
};

export default FileTable;
