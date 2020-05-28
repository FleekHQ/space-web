import React from 'react';
import MuiTableRow from '@material-ui/core/TableRow';

import useStyles from './styles';

const TableRow = (props) => {
  const classes = useStyles();

  return (
    <MuiTableRow
      classes={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default TableRow;
