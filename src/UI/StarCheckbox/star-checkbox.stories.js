import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import StarCheckbox from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('StarCheckbox', () => {

  const defaultProps = {
    onClick: action('onClick'),
    active: boolean('active', false),
  };

  return (
    <div style={{padding: 20}}>
      <StarCheckbox {...defaultProps} />
    </div>
  );
});