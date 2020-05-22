import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableRow from './index';
import TableCell from '../TableCell';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('TableRow', () => {
  const defaultProps = {
    hover: boolean('hover', true),
  };

  return (
    <Table>
      <TableBody>
        <TableRow {...defaultProps}>
          <TableCell>
            Another content
          </TableCell>
          <TableCell>
            current-cloud-backend.zip
          </TableCell>
          <TableCell>
            Apr 1, 2020 1:02:56 PM EST
          </TableCell>
          <TableCell>
            429.0 B
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});
