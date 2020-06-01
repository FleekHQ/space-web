import React from 'react';
import PropTypes from 'prop-types';
import MuiTableCell from '@material-ui/core/TableCell';

import useStyles from './styles';

const TableCell = ({ width, ...restProps }) => {
  const classes = useStyles({ width });

  return (
    <MuiTableCell
      padding="none"
      classes={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};
TableCell.defaultProps = {
  width: 'auto',
};

TableCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TableCell;
