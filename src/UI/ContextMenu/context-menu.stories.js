import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ContextMenu from './index';

const categoryName = 'ContextMenu';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    menuItemOnClick: (id) => { console.log(id) },
    i18n: {
      open: 'Open',
      share: 'Share',
      rename: 'Rename',
      trash: 'Trash',
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <ContextMenu {...defaultProps} />
    </div>
  );
});
