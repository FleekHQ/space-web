import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, boolean, text } from '@storybook/addon-knobs';

import StorageInfoBox from './index';

const categoryName = 'StorageInfoBox';

storiesOf(categoryName, module).add('StorageInfoBox', () => {

  const defaultProps = {
    i18n: object('i18n', {
      title: 'Storage Usage',
      local: 'Local',
      space: 'Space',
    }),
    localUsage: text('localUsage', '14 GB'),
    spaceUsage: text('spaceUsage', '26 GB'),
    spaceLimitReached: boolean('spaceLimitReached', false),
    backupTooltipProps: object('backupTooltipProps', {
      i18n: {
        warning: "Backup Limit Reached",
        description: "Upgrade to Space Pro to increase space storage limit.",
        button: "Upgrade to Space Pro",
      },
      onClick: () => {},
    }),
  };

  return (
    <div style={{padding: 20, width: 150}}>
      <StorageInfoBox {...defaultProps} />
    </div>
  );
});