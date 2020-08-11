import React from 'react';
import TextField from '@material-ui/core/TextField';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import PasswordCheckTooltip from './index';

const categoryName = 'Shared';

storiesOf(categoryName, module).add('PasswordCheckTooltip', () => {
  const defaultProps = {
    open: boolean('open', true),
    invert: boolean('invert', true),
    password: text('password', ''),
  };

  return (
    <div style={{ height: 500, padding: 20, backgroundColor: defaultProps.invert ? 'black' : 'white' }}>
      <PasswordCheckTooltip {...defaultProps}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </PasswordCheckTooltip>
    </div>
  );
});
