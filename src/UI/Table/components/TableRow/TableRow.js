import React from 'react';
import MuiTableRow from '@material-ui/core/TableRow';

import useStyles from './styles';

const TableRow = (props) => {
  const classes = useStyles();

  return (
    <MuiTableRow
      classes={classes}
      {...props}
    />
  );
};

export default TableRow;
