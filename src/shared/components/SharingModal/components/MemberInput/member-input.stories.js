import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import MemberInput from './index';

const categoryName = 'SharingModal.Components';

storiesOf(categoryName, module).add('MemberInput', () => {
  const defaultProps = {
    i18n: object('i18n', {
      to: 'To:',
      placeholder: 'Email, name',
    }),
    onChange: action('onChange'),
    defaultOption: select('defaultOption', [
      'edit',
      'view',
    ], 'edit'),
    options: object('options', [
      {
        id: 'edit',
        title: 'Can edit',
        description: 'Members can edit, delete, and add the file to their Space.',
      },
      {
        id: 'view',
        title: 'Can view',
        description: 'Members can view and download.',
      },
    ]),
  };

  return (
    <div style={{ width: 400 }}>
      <MemberInput {...defaultProps} />
    </div>
  );
});
