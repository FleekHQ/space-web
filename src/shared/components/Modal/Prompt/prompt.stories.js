import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Prompt from './index';

const categoryName = 'Modal';

storiesOf(categoryName, module).add('Prompt', () => {
  const defaultProps = {
    title: text('title', 'Pick a Username'),
    message: text('message', 'Turning off backup storage will delete your backed up files.'),
    validate: (value) => {
      console.log('validating...');

      if (value === 'username') return null;
      return 'Username incorrect';
    },
    onSubmit: action('onSubmit'),
    closeModal: action('closeModal'),
    validateOnChange: boolean('validateOnChange', false),
    validateOnSubmit: boolean('validateOnSubmit', true),
    i18n: object('i18n', {
      cancel: 'Cancel',
      submit: 'Confirm',
      label: 'Enter Username',
    }),
    textFieldProps: object('textFieldProps', {
      type: 'password',
    }),
  };

  return (
    <Prompt {...defaultProps} />
  );
});
