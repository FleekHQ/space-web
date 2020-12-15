import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import ThreeDotsButton from './index';

const categoryName = 'Breadcrumbs';

storiesOf(categoryName, module).add('ThreeDotsButton', () => {
  const defaultProps = {
    onClick: action('onClick'),
    isActive: boolean('isActive', false),
  };

  return (
    <div style={{ margin: 20 }}>
      <ThreeDotsButton {...defaultProps} />
    </div>
  );
});
