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
      <LoadingCell
        width="calc(100% - 25px)"
      />
    </TableCell>
    <TableCell>
      <LoadingCell
        width={24}
        style={{ marginRight: 10 }}
      />
      <LoadingCell
        width="calc(100% - 54px)"
      />
    </TableCell>
    <TableCell>
      <LoadingCell />
    </TableCell>
  </TableRow>
));

export default renderLoadingRows;
