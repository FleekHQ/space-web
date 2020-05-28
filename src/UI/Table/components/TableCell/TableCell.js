import React from 'react';
import MuiTableCell from '@material-ui/core/TableCell';

import useStyles from './styles';

const TableCell = (props) => {
  const classes = useStyles();

  return (
    <MuiTableCell
      padding="none"
      classes={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default TableCell;
