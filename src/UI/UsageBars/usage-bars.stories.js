import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, array } from '@storybook/addon-knobs';

import palette from '@terminal-packages/space-ui/core/theme/palette';

import UsageBars from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('UsageBars', () => {
  const defaultProps = {
    disabled: boolean('disabled', false),
    loading: boolean('loading', false),
    title: text('title', 'Local Usage'),
    using: <span>Using <span style={{ color: 'black' }}>997.2 MB</span></span>,
  };

  const theme1 = {
    borderColor: palette.palette.blue4,
    items: [
      {
        text: 'Storage (802.13 MB)',
        color: palette.palette.blue1,
        width: 30,
      },
      {
        text: 'Transfer - Resets Monthly (802.13 MB)',
        color: palette.palette.blue3,
        width: 70,
      }
    ],
  };

  const theme2 = {
    borderColor: palette.palette.green3,
    items: [
      {
        text: 'Storage (802.13 MB)',
        color: palette.palette.green2,
        width: 30,
      },
      {
        text: 'Transfer - Resets Monthly (802.13 MB)',
        color: palette.palette.green4,
        width: 40,
      },
      {
        text: 'Storage (802.13 MB)',
        color: palette.palette.blue1,
        width: 30,
      },
    ],
  };

  return (
    <div style={{ width: 600 }}>
      <div style={{ marginBottom: 20, }}>
        <UsageBars {...defaultProps} {...theme1} />
      </div>
      <UsageBars {...defaultProps} {...theme2} />
    </div>
  );
});
