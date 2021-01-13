import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RainbowField from './index';

const categoryName = 'RainbowField';

storiesOf(categoryName, module).add('default', () => {
  const endAdornment = (
    <FontAwesomeIcon
      icon={faEye}
      style={{
        position: 'absolute',
        right: 5,
        color: '#444444',
      }}
    />
  );

  const defaultProps = {
    disabled: boolean ('disabled', false),
    isDark: boolean('isDark', true),
    label: 'Email',
    multiline: boolean('multiline', false),
    rows: number('rows', 5),
    endAdornment,
  };

  return (
    <div style={{padding: 20, width: 250}}>
      <RainbowField {...defaultProps} />
    </div>
  );
});