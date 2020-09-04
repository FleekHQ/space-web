import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import Skeleton from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('Skeleton', () => {
  const defaultProps = {
    width: number('width', 100),
    height: number('height', 20),
  };

  return (
    <>
      <div>Default Skeleton</div>
      <Skeleton {...defaultProps} />
      <div>circle skeleton</div>
      <Skeleton variant="circle" width={20} height={20} />
    </>
  );
});
