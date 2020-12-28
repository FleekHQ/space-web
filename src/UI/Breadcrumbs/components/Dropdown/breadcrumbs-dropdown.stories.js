import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';

import BreadcrumbsDropdown from './index';

const categoryName = 'Breadcrumbs';

storiesOf(categoryName, module).add('Dropdown', () => {
  const defaultProps = {
    onItemClick: action('onItemClick'),
    items: object('items', [
      {
        id: 'id-1',
        name: 'File Upload',
        path: '/path',
      },
      {
        id: 'id-2',
        name: 'Folder Upload',
        path: '/path',
      },
      {
        id: 'id-3',
        name: 'Folder',
        path: '/path',
      },
      {
        id: 'id-4',
        name: 'File Upload',
        path: '/path',
      },
      {
        id: 'id-5',
        name: 'Folder Upload',
        path: '/path',
      },
      {
        id: 'id-6',
        name: 'Folder',
        path: '/path',
      },
    ]),
  };

  return (
    <div style={{ maxWidth: 178, margin: 20 }}>
      <BreadcrumbsDropdown {...defaultProps} />
    </div>
  );
});
