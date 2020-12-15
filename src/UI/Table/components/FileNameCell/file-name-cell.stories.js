import React from 'react';
import Table from '@material-ui/core/Table';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

import FileCell from './index';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('FileNameCell', () => {
  const defaultProps = {
    ext: text('ext', 'docx'),
    src: text('src', 'https://education.district0x.io/wp-content/uploads/IPFS-Large.jpg'),
    isShared: boolean('isShared', false),
    name: text('name', 'TechDocsV2.docx'),
    selected: boolean('selected', false),
  };

  return (
    <Table style={{ tableLayout: 'fixed', marginTop: 100 }}>
      <TableBody>
        <TableRow>
          <FileCell {...defaultProps} />
        </TableRow>
      </TableBody>
    </Table>
  );
});
