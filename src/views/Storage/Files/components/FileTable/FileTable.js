import path from 'path';
import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { addItems, fetchObjects, openObject } from '@events';
import { UPDATE_OBJECTS } from '@reducers/storage';
import { formatBytes, objectsSelector } from '@utils';
import Dropzone from '@shared/components/Dropzone';
import Table, { TableCell, TableRow, FileCell } from '@ui/Table';

import useStyles from './styles';

const FileTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const wrapperRef = React.useRef(null);

  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '') || '';

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
          key: 'name',
          width: '41%',
        },
        {
          key: 'members',
          width: '29%',
        },
        {
          key: 'lastModified',
        },
        {
          key: '',
          width: 43,
        },
      ],
    };
  });

  const handleRowClick = ({ rowIndex }) => (event) => {
    event.preventDefault();

    const isShiftKeyPress = !!event.shiftKey;
    const isCtrlOrMetaPress = !!(event.ctrlKey || event.metaKey);
    const pivoteRowIndex = rows.findIndex((_row) => _row.pivote);

    const payload = rows.reduce((newRows, _row, index) => {
      if (
        isShiftKeyPress
        && pivoteRowIndex !== -1
        && (
          (rowIndex > pivoteRowIndex && index >= pivoteRowIndex && index <= rowIndex)
          || (rowIndex < pivoteRowIndex && index >= rowIndex && index <= pivoteRowIndex)
        )
      ) {
        return newRows.concat({
          ..._row,
          selected: true,
        });
      }

      if (pivoteRowIndex === -1 || pivoteRowIndex === rowIndex || !isCtrlOrMetaPress) {
        return newRows.concat({
          ..._row,
          pivote: index === rowIndex,
          selected: index === rowIndex,
        });
      }

      return newRows.concat({
        ..._row,
        pivote: index === rowIndex,
        selected: index === rowIndex ? !_row.selected : _row.selected,
      });
    }, []);

    dispatch({
      payload,
      type: UPDATE_OBJECTS,
    });
  };

  const handleDoubleRowClick = ({ row }) => (event) => {
    event.preventDefault();
    let newRows = [];

    if (row.type === 'folder') {
      const redirectUrl = path.join('/storage/files', prefix, row.name);
      history.push(redirectUrl);

      newRows = rows.map((_row) => ({
        ..._row,
        pivote: false,
        selected: false,
      }));
    } else if (row.type === 'file') {
      openObject(row.key);

      newRows = rows.map((_row) => ({
        ..._row,
        pivote: row.id === _row.id,
        selected: row.id === _row.id,
      }));
    }

    dispatch({
      type: UPDATE_OBJECTS,
      payload: newRows,
    });
  };

  const handleRowRightClick = ({ row }) => (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('TODO: show context menu');

    if (row.selected) {
      return;
    }

    const newRows = rows.map((_row) => ({
      ..._row,
      pivote: _row.id === row.id,
      selected: _row.id === row.id,
    }));

    dispatch({
      type: UPDATE_OBJECTS,
      payload: newRows,
    });
  };

  const handleTableOutsideClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      const detailePanel = document.getElementById('detail-panel');
      if (detailePanel.contains(event.target)) {
        return;
      }

      dispatch({
        type: UPDATE_OBJECTS,
        payload: rows.map((_row) => ({
          ..._row,
          pivote: false,
          selected: false,
        })),
      });
    }
  };

  React.useEffect(() => {
    fetchObjects();
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleTableOutsideClick);

    return () => {
      document.removeEventListener('click', handleTableOutsideClick);
    };
  }, [rows]);

  return (
    <div className={classes.tableWrapper}>
      <Dropzone
        noClick
        onDrop={(files) => {
          addItems({
            targetPath: prefix,
            sourcePaths: files.map((file) => file.path),
          });
        }}
        classes={{ root: classes.dropzone, active: classes.dropzoneActive }}
      >
        <div ref={wrapperRef}>
          <Table
            head={heads}
            rows={rows}
            className={classes.root}
            renderHead={({ head = [] }) => (
              <TableRow>
                {head.map(({ key, width }) => (
                  <TableCell key={key} className={classes.headerCell} width={width}>
                    <Typography variant="body2">
                      {t(`modules.storage.fileTable.head.${key}`, '')}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            )}
            renderRow={({ row, rowIndex }) => (
              <TableRow
                hover
                key={row.id}
                className={classNames(classes.row, {
                  [classes.selected]: row.selected,
                })}
                onClick={handleRowClick({ row, rowIndex })}
                onContextMenu={handleRowRightClick({ row })}
                onDoubleClick={handleDoubleRowClick({ row })}
              >
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
                    {moment(row.lastModified).format('MMM d, YYYY hh:mm:ss A z')}
                    {/* ^ just for testing, after POC should be used line below */}
                    {/* {formatMonthDayYear(row.lastModified)} */}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.options}
                    color="secondary"
                    disableRipple
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          />
        </div>
      </Dropzone>
    </div>
  );
};

export default FileTable;
