import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Typography from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('Typography', () => {

  const defaultProps = {
    weight: select('weight', [undefined, 'medium'], undefined),
    color: select('color', ['primary', 'secondary', 'textSecondary', 'error'], 'primary'),
  };

  return <Typography {...defaultProps}>Some text</Typography>;
});
