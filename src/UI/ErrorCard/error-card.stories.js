import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ErrorCard from './index';

const categoryName = 'ErrorCard';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    message: text('message', 'Error Message'),
  };

  return (
    <ErrorCard {...defaultProps} />
  );
});
