import React from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';

import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';

import MenuDropdown from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('MenuDropdown', () => {
  const defaultProps = {
    onItemClick: action('onItemClick'),
    items: object('items', [
      {
        id: 'id-1',
        divider: false,
        icon: faFileUpload,
        name: 'File Upload',
      },
      {
        id: 'id-2',
        divider: true,
        icon: faFolderUpload,
        name: 'Folder Upload',
      },
      {
        id: 'id-3',
        divider: false,
        icon: faFolderUpload,
        name: 'Folder',
      },
      {
        id: 'id-4',
        divider: false,
        icon: faFileUpload,
        name: 'File Upload',
      },
      {
        id: 'id-5',
        divider: true,
        icon: faFolderUpload,
        name: 'Folder Upload',
      },
      {
        id: 'id-6',
        divider: false,
        icon: faFolderUpload,
        name: 'Folder',
      },
    ]),
  };

  return (
    <Paper style={{ maxWidth: 200 }}>
      <MenuDropdown {...defaultProps} />
    </Paper>
  );
});
