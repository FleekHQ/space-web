import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, boolean } from '@storybook/addon-knobs';

import UsageBars from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('UsageBars', () => {
  const defaultProps = {
    disabled: boolean('disabled', false),
    themeIndex: number('themeIndex', 0),
    firstBarWidth: number('firstBarWidth', 30),
    title: text('title', 'Local Usage'),
    using: <span>Using <span style={{ color: 'black' }}>997.2 MB</span></span>,
    firstBarText: text('firstBarText', 'Storage (802.13 MB)'),
    secondBarText: text('secondBarText', 'Transfer - Resets Monthly (802.13 MB)'),
  };

  return (
    <div style={{ width: 400 }}>
      <UsageBars {...defaultProps} />
    </div>
  );
});
