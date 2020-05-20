import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Button from '@material-ui/core/Button';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('Button', () => {
  const props = {
    variant: select('variant', ['text', 'contained', 'outlined'], 'text'),
    color: select('color', [undefined, 'primary', 'secondary'], undefined),
    disabled: boolean('disabled', false),
  };

  return <Button {...props}>Some text</Button>;
});
