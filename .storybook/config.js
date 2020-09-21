import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import createSpaceTheme from '@terminal-packages/space-ui/core/theme';

import initConfig from '../src/locales';

i18n.use(initReactI18next).init(initConfig);

const theme = createSpaceTheme();

const withProviders = (story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {story()}
  </ThemeProvider>
);

addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(withProviders);

configure(
  require.context('../src', true, /\.stories\.js$/),
  module,
);
