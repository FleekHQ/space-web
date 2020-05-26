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
        <InputAdornment position="start">
          <span style={{ margin: 0, fontSize: 13 }} role="img" aria-label="Floppy Disk Emoji">💾</span>
        </InputAdornment>
      )
    } : undefined,
  };

  return <TextField {...props} />;
});
