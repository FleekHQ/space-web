import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, boolean, select } from '@storybook/addon-knobs';

import PermissionsDropdown from './index';

const categoryName = 'PermissionsDropdown';

storiesOf(categoryName, module).add('Menu', () => {
  const defaultProps = {
    open: boolean('open', true),
    onChange: action('onChange'),
    disableBorder: boolean('disableBorder', false),
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
    <div style={{ height: 500 }}>
      <PermissionsDropdown {...defaultProps} />
    </div>
  );
});
