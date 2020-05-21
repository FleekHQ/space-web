import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import FolderNavButton from './index';

const categoryName = 'FolderNavButton';

storiesOf(categoryName, module).add('FolderNavButton', () => {
  const props = {
    direction: select('direction', ['back', 'forward'], 'forward'),
    disabled: boolean('disabled', false),
  };

  return <FolderNavButton {...props} />;
});
