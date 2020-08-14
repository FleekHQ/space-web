import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChangePassword from './index';

const categoryName = 'Modal.ChangePassword';

storiesOf(categoryName, module).add('Modal', () => {
  const defaultProps = {
    confirm: action('confirm'),
    closeModal: action('closeModal'),
  };

  return (
    <ChangePassword {...defaultProps} />
  );
});
