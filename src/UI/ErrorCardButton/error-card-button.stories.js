import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ErrorCard from './index';

const categoryName = 'ErrorCard';

storiesOf(categoryName, module).add('button', () => {
  const defaultProps = {
    message: text('message', 'Error Message'),
    buttonText: text('buttonText', 'Refresh Files'),
    buttonOnClick: action('buttonOnclick'),
  };

  return (
    <ErrorCard {...defaultProps} />
  );
});
