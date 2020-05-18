import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ThemeProvider } from '@material-ui/core/styles';
import createFleekTheme from '@ui/theme';

const theme = createFleekTheme();

const withProviders = (story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
);

addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withProviders);

configure(
  require.context('../src', true, /\.stories\.js$/),
  module,
);
