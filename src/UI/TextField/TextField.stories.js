import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('TextField', () => {
  const props = {
    label: text('label', 'Folder name'),
    variant: select('variant', ['outlined', 'filled'], 'outlined'),
    InputProps: boolean('with adornment', false) ? {
      startAdornment: (
        <InputAdornment hiddenLabel position="start">
          <h1 style={{ margin: 0, fontSize: 13 }}>💾</h1>
        </InputAdornment>
      )
    } : undefined,
  };

  return <TextField {...props} />;
});
