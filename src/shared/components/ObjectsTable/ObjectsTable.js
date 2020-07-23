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
  heads,
  rows,
  onDropzoneDrop,
  renderRow,
  withRowOptions,
  getRedirectUrl,
  bucket,
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
      bucket,
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
      bucket,
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
      bucket,
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
        bucket,
      });
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
        classes={{ root: classes.dropzone, active: classes.dropzoneActive }}
        disabled={!onDropzoneDrop}
      >
        <div ref={wrapperRef}>
          <Table
            head={withRowOptions ? [...heads, { width: 43 }] : heads}
            rows={rows}
            className={classes.root}
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
                {renderRow(row)}
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
      </Dropzone>
    </div>
  );
};

ObjectsTable.defaultProps = {
  onDropzoneDrop: null,
  withRowOptions: false,
};

ObjectsTable.propTypes = {
  onDropzoneDrop: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  heads: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  renderRow: PropTypes.func.isRequired,
  getRedirectUrl: PropTypes.func.isRequired,
  bucket: PropTypes.string.isRequired,
  withRowOptions: PropTypes.bool,
};

export default ObjectsTable;
