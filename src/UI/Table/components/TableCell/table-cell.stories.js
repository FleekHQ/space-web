import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '@material-ui/core/Table';

import TableCell from './index';
import TableRow from '../TableRow';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('TableCell', () => {
  const defaultProps = {};

  return (
    <Table>
      <TableRow>
        <TableCell {...defaultProps}>
          Value
        </TableCell>
      </TableRow>
    </Table>
  );
});
