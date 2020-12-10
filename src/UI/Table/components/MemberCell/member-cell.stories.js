import React from 'react';
import Table from '@material-ui/core/Table';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';

import MemberCell from './index';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('MemberCell', () => {
  const defaultProps = {
    avatarUrl: text('imageUrl', 'http://preview.byaviators.com/template/superlist/assets/img/tmp/agent-2.jpg'),
    username: text('username', 'Grant Hehmen'),
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
          <MemberCell {...defaultProps} />
        </TableRow>
      </TableBody>
    </Table>
  );
});
