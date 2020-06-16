import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Header from './index';

const categoryName = 'SharingModal.Components';

storiesOf(categoryName, module).add('Header', () => {
  const defaultProps = {
    children: text('children', 'Folder'),
    ext: select('ext', [
      'pdf',
      'zip',
      'jpg',
      'ppt',
      'doc',
      'mp3',
      'mp4',
      'folder',
      'default',
    ], 'folder'),
  };

  return (
    <Header {...defaultProps} />
  );
});
