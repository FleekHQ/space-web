import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Table from './index';
import {
  TableRow,
  TableCell,
} from './components';

const categoryName = 'ElementalComponents/Table';

const renderHead = ({ head = [] }) => (
  <TableRow>
    {head.map((label) => (
      <TableCell key={label}>
        {label}
      </TableCell>
    ))}
  </TableRow>
);

const renderRow = ({ row }) => (
  <TableRow
    key={row.id}
    hover
  >
    <TableCell>
      {row.name}
    </TableCell>
    <TableCell>
      members
    </TableCell>
    <TableCell>
      {row.lastModified}
    </TableCell>
    <TableCell>
      options
    </TableCell>
  </TableRow>
);

storiesOf(categoryName, module).add('Table', () => {
  const defaultProps = {
    head: object('head', [
      'Name',
      'Members',
      'Last Modified',
      '',
    ]),
    rows: object('rows', [
      {
        id: 'a1',
        type: 'folder',
        name: 'Analytics',
        lastModified: 'Apr 1, 2020 1:02:56 PM EST',
        size: '429.0 B',
        selected: false,
      },
      {
        id: 'b2',
        type: 'file',
        name: 'TechDocsV2.docx',
        lastModified: 'Mar 12, 2020 12:11:32 PM EST',
        size: '773.0 B',
        selected: false,
      },
      {
        id: 'c3',
        type: 'file',
        name: 'IPFS-Report.pdf',
        lastModified: 'Mar 15, 2020 15:45:12 PM EST',
        size: '112.0 B',
        selected: false,
      },
      {
        id: 'd4',
        type: 'file',
        name: 'Branding.zip',
        lastModified: 'Feb 22, 2020 18:29:44 PM EST',
        size: '518.0 B',
        selected: false,
      },
      {
        id: 'e5',
        type: 'file',
        name: 'IPFS-Summit.pptx',
        lastModified: 'Jun 17, 2020 20:33:01 PM EST',
        size: '201.0 B',
        selected: true,
      },
      {
        id: 'f6',
        type: 'file',
        name: 'TwitterProPic.jpg',
        lastModified: 'Jan 11, 2020 19:18:00 PM EST',
        size: '599.5 B',
        selected: true,
      },
      {
        id: 'g7',
        type: 'file',
        name: 'key.sh',
        lastModified: 'Apr 23, 2020 13:55:17 PM EST',
        size: '800.0 KB',
        selected: true,
      },
    ]),
    loading: boolean('loading', false),
    onSingleClickRow: action('onSingleClickRow'),
    onDoubleClickRow: action('onDoubleClickRow'),
    renderRow,
    renderHead,
    // renderLoadingRows,
  };

  return (
    <div
      style={{
        backgroundColor: '#f6f8fc',
        padding: 20,
      }}
    >
      <Table {...defaultProps} />
    </div>
  );
});
