import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';

import CreateNewButton from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('CreateNewButton', () => {
  const defaultProps = {
    i18n: object('i18n', {
      buttonText: 'Create New',
    }),
    onClick: action('onClick'),
  };

  return (
    <div >
      <CreateNewButton {...defaultProps} />
    </div>
  );
});
