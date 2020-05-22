import React from 'react';
import Table from '@material-ui/core/Table';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';

import FileCell from './index';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('FileCell', () => {
  const defaultProps = {
    ext: text('ext', 'docx'),
    src: text('src', 'https://education.district0x.io/wp-content/uploads/IPFS-Large.jpg'),
  };

  const children = text('children', 'TechDocsV2.docx');

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Name
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <FileCell {...defaultProps}>
            <Typography variant="body1">
              {children}
            </Typography>
          </FileCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});
