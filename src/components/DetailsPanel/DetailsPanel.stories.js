import React from 'react';
import { storiesOf } from '@storybook/react';

import DetailsPanel from './index';

const categoryName = 'DetailsPanel';

storiesOf(categoryName, module).add('DetailsPanel', () => {
  return <DetailsPanel />;
});
