import React from 'react';
import { storiesOf } from '@storybook/react';

import IconsTooltip from './index';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('IconsTooltip', () => {
  const defaultProps = {

  };

  return (
    <div style={{ width: 200, height: 200, padding: 20 }}>
      <IconsTooltip {...defaultProps} />
    </div>
  );
});
