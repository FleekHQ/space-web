import React from 'react';
import {
  TableRow,
  TableCell,
  LoadingCell,
} from '@ui/Table/components';

const renderLoadingRows = () => [...Array(20)].map((_, index) => (
  <TableRow
    // eslint-disable-next-line react/no-array-index-key
    key={index}
  >
    <TableCell>
      <LoadingCell isIconCell />
    </TableCell>
    <TableCell>
      <LoadingCell />
    </TableCell>
    <TableCell>
      <LoadingCell />
    </TableCell>
    <TableCell>
      <LoadingCell isLastCell />
    </TableCell>
  </TableRow>
));

export default renderLoadingRows;
