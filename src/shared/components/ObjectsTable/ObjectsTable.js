import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { openObject } from '@events';
import { UPDATE_OBJECTS } from '@reducers/storage';
import Dropzone from '@shared/components/Dropzone';
import Table, { TableCell, TableRow } from '@ui/Table';

import useStyles from './styles';

const ObjectsTable = ({
  rows,
  heads,
  renderRow: RenderRow,
  withRowOptions,
  getRedirectUrl,
  onOutsideClick,
  onDropzoneDrop,
  loading,
  renderLoadingRows,
  EmptyState,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = React.useRef(null);

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
      const redirectUrl = getRedirectUrl(row);
      history.push(redirectUrl);

      newRows = rows.map((_row) => ({
        ..._row,
        pivote: false,
        selected: false,
      }));
    } else if (row.type === 'file') {
      const rowBucket = row.sourceBucket || row.bucket;
      openObject({
        path: row.key,
        dbId: row.dbId,
        bucket: rowBucket,
        name: row.name,
        ipfsHash: row.ipfsHash,
        isPublicLink: row.isPublicLink,
      });

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
      onOutsideClick(event.target);
    }
  };

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
        onDrop={onDropzoneDrop}
        disabled={!onDropzoneDrop}
        objectsList={rows.map((obj) => ({
          isFolder: obj.type === 'folder',
          name: obj.key,
        }))}
      >
        <div ref={wrapperRef}>
          <Table
            head={withRowOptions ? [...heads, { width: 43 }] : heads}
            rows={rows}
            className={classes.root}
            renderLoadingRows={renderLoadingRows}
            loading={loading}
            renderHead={({ head = [] }) => (
              <TableRow>
                {head.map(({ width, title }) => (
                  <TableCell key={title || 'options'} className={classes.headerCell} width={width}>
                    <Typography variant="body2">
                      {title}
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
                <RenderRow row={row} />
                {withRowOptions && (
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
                )}
              </TableRow>
            )}
          />
        </div>
        {!loading && !rows.length && <EmptyState />}
      </Dropzone>
    </div>
  );
};

ObjectsTable.defaultProps = {
  onDropzoneDrop: null,
  withRowOptions: false,
  onOutsideClick: () => null,
  renderLoadingRows: () => null,
  loading: false,
  EmptyState: () => null,
};

ObjectsTable.propTypes = {
  onDropzoneDrop: PropTypes.func,
  onOutsideClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  heads: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  renderRow: PropTypes.elementType.isRequired,
  getRedirectUrl: PropTypes.func.isRequired,
  withRowOptions: PropTypes.bool,
  renderLoadingRows: PropTypes.func,
  loading: PropTypes.bool,
  EmptyState: PropTypes.elementType,
};

export default ObjectsTable;
