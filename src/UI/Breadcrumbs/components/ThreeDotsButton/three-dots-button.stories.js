import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreeDotsButton from './index';

const categoryName = 'Breadcrumbs';

storiesOf(categoryName, module).add('ThreeDotsButton', () => {
  const defaultProps = {
  };

  return (
    <div style={{ margin: 20 }}>
      <ThreeDotsButton {...defaultProps} />
    </div>
  );
});
