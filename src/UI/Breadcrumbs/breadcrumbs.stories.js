import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import Breadcrumbs from './index';

const categoryName = 'Breadcrumbs';

storiesOf(categoryName, module).add('Breadcrumbs', () => {
  const defaultProps = {
    items: object('items', [
      {
        id: 'my-files',
        name: 'my-files',
        type: 'root',
        path: '/root',
      },
      {
        id: 'folder-1',
        name: 'Folder 1',
        type: 'folder',
        path: '/root/folder-1',
      },
      {
        id: 'folder-2',
        name: 'Folder 2',
        type: 'folder',
        path: '/root/folder-1/folder-2',
      }
    ]),
    history: { push: (path) => console.log(path) },
  };

  return (
    <div style={{ padding: 10 }}>
      <Breadcrumbs {...defaultProps} />
    </div>
  );
});
