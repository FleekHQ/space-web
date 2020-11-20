import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';

import TableRow from './index';
import FileCell from '../FileCell';
import TableCell from '../TableCell';
import IconsCell from '../IconsCell';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('TableRow', () => {
  const defaultProps = {
    hover: boolean('hover', true),
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f6f8fc', height: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body2">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                Members
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                Last Modified
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow {...defaultProps}>
            <FileCell ext="zip">
              <Typography variant="body1">
                current-cloud-backend.zip
              </Typography>
            </FileCell>
            <TableCell>
              <Typography variant="body1" color="secondary">
                Only You
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="secondary">
                Apr 1, 2020 1:02:56 PM EST
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconsCell />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
});
