import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SwitchButton from './index';

const categoryName = 'SwitchButton';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    onChange: action('onChange'),
    i18n: object('i18n', {
      enable: 'On',
      disable: 'Off',
    }),
    value: select('value', [
      'on',
      'off',
    ], 'off'),
  };

  return (
    <div style={{ padding: 20 }}>
      <SwitchButton {...defaultProps} />
    </div>
  );
});
