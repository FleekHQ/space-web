import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingCell from './index';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('LoadingCell', () => {
  const defaultProps = {};

  return (
    <div style={{ padding: 20 }}>
      <LoadingCell
        {...defaultProps}
      />
    </div>
  );
});
