import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Settings from './index';

const categoryName = 'Modal';

storiesOf(categoryName, module).add('Settings', () => {
  const defaultProps = {
    closeModal: action('closeModal'),
  };

  return (
    <Settings {...defaultProps} />
  );
});
