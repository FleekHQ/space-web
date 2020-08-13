import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, select, boolean } from '@storybook/addon-knobs';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import InputTooltip, { Requirement } from './index';

const categoryName = 'ElementalComponents/InputTooltip';

storiesOf(categoryName, module).add('InputTooltip', () => {
  const defaultProps = {
    title: text('title', 'Some title'),
    tooltip: object('items', {
      arrow: true,
      open: true,
      placement: 'right-start',
    }),
    bgColor: select('bgColor', [
      'primary',
      'secondary',
    ], 'primary'),
    type: select('type', [
      'info',
      'danger',
    ], 'info'),
  };

  const defaultProps1 = {
    title: text('title', 'Some title'),
    tooltip: object('items', {
      arrow: true,
      open: true,
      placement: 'right-start',
    }),
    bgColor: select('bgColor', [
      'primary',
      'secondary',
    ], 'primary'),
    type: select('type', [
      'info',
      'danger',
    ], 'info'),
    requirements: (
      <>
        <Requirement
          isCorrect
          requirement="Some requirement correct"
        />
        <Requirement
          isCorrect={false}
          requirement="Some requirement incorrect"
        />
      </>
    ),
  };

  return (
    <Paper
      style={{
        height: 500,
        padding: 20,
        backgroundColor: defaultProps.bgColor === 'primary' ? 'white' : 'black'
      }}
    >
      <InputTooltip {...defaultProps}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </InputTooltip>
      <br />
      <br />
      <br />
      <br />
      <br />
      <InputTooltip {...defaultProps1}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </InputTooltip>
    </Paper>
  );
});

storiesOf(categoryName, module).add('Requirement', () => {
  const defaultProps = {
    isCorrect: boolean('isCorrect', true),
    requirement: text('requirement', 'Some requirement'),
  };

  return (
    <Paper style={{ maxWidth: 200 }}>
      <Requirement {...defaultProps} />
    </Paper>
  );
});