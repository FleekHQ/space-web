import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowUp } from '@fortawesome/pro-regular-svg-icons/faLongArrowUp';
import { faLongArrowDown } from '@fortawesome/pro-regular-svg-icons/faLongArrowDown';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Dropzone from '@shared/components/Dropzone';
import Popper from '@material-ui/core/Popper';
import Table, { TableCell, TableRow } from '@ui/Table';
import ContextMenu from '@ui/ContextMenu';
import { useTranslation } from 'react-i18next';
import { getTabulations, getContextMenuItems } from '@utils';
import { getDealId } from '@events/filecoin';
import { UPDATE_OBJECTS } from '@reducers/storage';
import RainbowRow from '@shared/components/RainbowRow';
import GeneralMove from '@shared/components/GeneralMove';

import useMenuItemOnClick, { openAction } from '@utils/use-menu-item-on-click';
import { RainbowRowProvider } from '@shared/utils/rainbow-row-context';

import useStyles from './styles';

const ObjectsTable = ({
  rows: unsortedRows,
  heads,
  renderRow: RenderRow,
  withRowOptions,
  onOutsideClick,
  onDropzoneDrop,
  loading,
  renderLoadingRows,
  EmptyState,
  fetchDir,
  disableRowOffset,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const initialContextState = {
    mouseX: null,
    mouseY: null,
  };
  const [contextState, setContextState] = React.useState(initialContextState);

  const handleContextClose = () => {
    setContextState(initialContextState);
  };

  const [filtersDirection, setFiltersDirection] = useState({
    name: 'desc',
    size: 'desc',
    lastModified: 'desc',
  });
  const [currentFilter, setCurrentFilter] = useState('name');

  const getSortedRows = (rowsToSort) => (rowsToSort.sort((rowA, rowB) => {
    let compareValueA = rowA[currentFilter];
    let compareValueB = rowB[currentFilter];
    if (filtersDirection[currentFilter] === 'desc') {
      compareValueA = rowB[currentFilter];
      compareValueB = rowA[currentFilter];
    }
    if (compareValueA instanceof Date) {
      compareValueA = new Date(compareValueA).getTime();
      compareValueB = new Date(compareValueB).getTime();
    }

    if (typeof compareValueA === 'string') {
      compareValueA = compareValueA.toLowerCase();
      compareValueB = compareValueB.toLowerCase();
      if (compareValueA > compareValueB) {
        return 1;
      }
      if (compareValueA < compareValueB) {
        return -1;
      }
      return 0;
    }

    return (compareValueA - compareValueB);
  }));

  const sortAndAddSubfolders = (rows) => {
    let sorted = getSortedRows(rows);
    sorted = sorted.reduce((newArr, row) => {
      let arrayWithSubfolder = newArr;
      arrayWithSubfolder.push(row);
      if (row.expanded) {
        const subFolderContent = sortAndAddSubfolders(row.folderContent);
        arrayWithSubfolder = arrayWithSubfolder.concat(subFolderContent);
      }
      return arrayWithSubfolder;
    }, []);
    return sorted;
  };

  const sortedRows = sortAndAddSubfolders(unsortedRows);

  const classes = useStyles();

  const clickedItem = sortedRows.find((row) => row.selected);

  const menuItemOnClick = useMenuItemOnClick({
    clickedItem,
    handleContextClose,
  });

  const handleRowClick = ({ rowIndex }) => (event, keypresses) => {
    event.preventDefault();

    const isShiftKeyPress = !!keypresses.shiftKey;
    const isCtrlOrMetaPress = !!(keypresses.ctrlKey || keypresses.metaKey);
    const pivoteRowIndex = sortedRows.findIndex((_row) => _row.pivote);

    const payload = sortedRows.reduce((newRows, _row, index) => {
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
    if (event) {
      event.preventDefault();
    }
    let newRows = [];

    if (row.type === 'folder') {
      newRows = sortedRows.map((_row) => ({
        ..._row,
        pivote: false,
        selected: false,
      }));
    } else if (row.type === 'file') {
      newRows = sortedRows.map((_row) => ({
        ..._row,
        pivote: row.id === _row.id,
        selected: row.id === _row.id,
      }));
    }

    dispatch({
      type: UPDATE_OBJECTS,
      payload: newRows,
    });

    openAction({
      clickedItem: row,
      dispatch,
      history,
    });
  };

  const handleRowRightClick = ({ row }) => (event) => {
    event.preventDefault();

    getDealId(row);
    setContextState({
      mouseX: event.clientX - 2,
      mouseY: window.innerHeight - event.clientY < 150
        ? window.innerHeight - 160 : event.clientY - 4,
    });

    const newRows = sortedRows.map((_row) => ({
      ..._row,
      pivote: _row.id === row.id,
      selected: _row.id === row.id,
    }));

    dispatch({
      type: UPDATE_OBJECTS,
      payload: newRows,
    });
  };

  const sortButtonOnClick = (id) => {
    if (currentFilter === id) {
      setFiltersDirection({
        ...filtersDirection,
        [id]: filtersDirection[id] === 'desc' ? 'asc' : 'desc',
      });
      return;
    }
    setCurrentFilter(id);
  };

  const arrowOnClick = (clickedRow) => {
    if (clickedRow.error) return;
    const expanded = !clickedRow.expanded;

    const newRows = [
      {
        ...clickedRow,
        expanded,
      },
    ];

    if (expanded) {
      fetchDir(clickedRow.key);
    }

    dispatch({
      payload: newRows,
      type: UPDATE_OBJECTS,
    });
  };

  const contextMenuItems = getContextMenuItems({
    object: clickedItem,
    t,
  });

  const getDropzoneObjsList = () => {
    let indexOfLastVisitedRootObj = 0;

    return sortedRows.map((obj, index) => {
      if (getTabulations(obj.key, location) === 0) {
        indexOfLastVisitedRootObj = index;
      }
      return {
        isFolder: obj.type === 'folder',
        name: obj.key,
        index: indexOfLastVisitedRootObj,
      };
    });
  };

  return (
    <RainbowRowProvider>
      <div className={classes.tableWrapper}>
        <Dropzone
          noClick
          onDrop={onDropzoneDrop}
          disabled={!onDropzoneDrop}
          objectsList={getDropzoneObjsList()}
        >
          <RainbowRow objectsList={getDropzoneObjsList()} />
          <GeneralMove>
            <Table
              head={withRowOptions ? [...heads, { width: 43 }] : heads}
              rows={sortedRows}
              className={classes.root}
              renderLoadingRows={renderLoadingRows}
              onOutsideClick={onOutsideClick}
              loading={loading}
              renderHead={({ head = [] }) => (
                <TableRow>
                  {head.map(({
                    width,
                    title,
                    isSortable,
                    id,
                    paddingLeft = 0,
                  }) => (
                    <TableCell
                      key={title || 'options'}
                      className={classes.headerCell}
                      width={width}
                      style={{ paddingLeft }}
                    >
                      {isSortable ? (
                        <ButtonBase
                          className={classes.sortButton}
                          onClick={() => sortButtonOnClick(id)}
                        >
                          <Typography variant="body2">
                            {title}
                          </Typography>
                          {(currentFilter === id) && (
                            <FontAwesomeIcon
                              icon={(filtersDirection[currentFilter] === 'desc') ? faLongArrowDown : faLongArrowUp}
                              className={classes.filterDirectionIcon}
                            />
                          )}
                        </ButtonBase>
                      ) : (
                        <Typography variant="body2">
                          {title}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )}
              renderRow={({ row, rowIndex }) => (
                <RenderRow
                  row={row}
                  rowIndex={rowIndex}
                  disableOffset={disableRowOffset}
                  arrowOnClick={() => arrowOnClick(row)}
                  handleRowClick={handleRowClick}
                  handleRowRightClick={handleRowRightClick}
                  handleDoubleRowClick={handleDoubleRowClick}
                  rowClasses={classes}
                />
              )}
            />
            <Popper
              open={contextState.mouseY !== null}
              onClose={handleContextClose}
              onClickAway={handleContextClose}
              style={{
                top: contextState.mouseY,
                left: contextState.mouseX,
              }}
            >
              <ContextMenu
                onClickAway={handleContextClose}
                menuItemOnClick={menuItemOnClick}
                items={contextMenuItems}
              />
            </Popper>
            {!loading && !sortedRows.length && <EmptyState />}
          </GeneralMove>
        </Dropzone>
      </div>
    </RainbowRowProvider>
  );
};

ObjectsTable.defaultProps = {
  onDropzoneDrop: null,
  withRowOptions: true,
  onOutsideClick: () => null,
  renderLoadingRows: () => null,
  loading: false,
  EmptyState: () => null,
  fetchDir: () => null,
  disableRowOffset: false,
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
  withRowOptions: PropTypes.bool,
  renderLoadingRows: PropTypes.func,
  loading: PropTypes.bool,
  EmptyState: PropTypes.elementType,
  fetchDir: PropTypes.func,
  disableRowOffset: PropTypes.bool,
};

export default ObjectsTable;
