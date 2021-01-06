import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Table = (props) => {
  const {
    rows,
    head,
    loading,
    renderRow,
    renderHead,
    renderLoadingRows,
    onOutsideClick,
    ...restProps
  } = props;

  const content = loading
    ? renderLoadingRows()
    : rows.map((row, index) => renderRow({
      row,
      rows,
      head,
      loading,
      renderRow,
      renderHead,
      renderLoadingRows,
      rowIndex: index,
      ...restProps,
    }));

  return (
    <ClickAwayListener onClickAway={onOutsideClick}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <MuiTable {...restProps}>
        <TableHead>
          {renderHead({
            rows,
            head,
            loading,
            renderRow,
            renderHead,
            renderLoadingRows,
            ...restProps,
          })}
        </TableHead>
        <TableBody>
          {content}
        </TableBody>
      </MuiTable>
    </ClickAwayListener>
  );
};

Table.defaultProps = {
  rows: [],
  head: null,
  loading: false,
  renderRow: () => null,
  renderHead: () => null,
  renderLoadingRows: () => null,
  onOutsideClick: () => null,
};

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  head: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  rows: PropTypes.array,
  loading: PropTypes.bool,
  renderRow: PropTypes.func,
  renderHead: PropTypes.func,
  renderLoadingRows: PropTypes.func,
  onOutsideClick: PropTypes.func,
};

export default Table;
