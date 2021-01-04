import React from 'react';
import { storiesOf } from '@storybook/react';

import RainbowButton from './index';

const categoryName = 'RainbowButton';

storiesOf(categoryName, module).add('default', () => {

  return (
    <RainbowButton>
      Buton Text
    </RainbowButton>
  );
});
