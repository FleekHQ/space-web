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
        onClick: () => {},
      },
      {
        id: 'folder-1',
        name: 'Folder 1',
        type: 'folder',
        onClick: () => {},
      },
      {
        id: 'folder-2',
        name: 'Folder 2',
        type: 'folder',
        onClick: () => {},
      }
    ]),
  };

  return (
    <div style={{ padding: 10 }}>
      <Breadcrumbs {...defaultProps} />
    </div>
  );
});
