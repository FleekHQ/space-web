import React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';

import useStyles from './styles';

const TableCell = (props) => {
  const classes = useStyles();

  return (
    <MuiTableCell
      padding="none"
      classes={classes}
      {...props}
    />
  );
};

export default TableCell;
