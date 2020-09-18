import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UpgradeTooltip from './index';

const categoryName = 'ElementalComponents/Table';

storiesOf(categoryName, module).add('UpgradeTooltip', () => {
  const defaultProps = {
    i18n: {
      warning: "Backup Limit Reached",
      description: "This file is not backed up, upgrade to Space Pro to back up this file.",
      button: "Upgrade to Space Pro",
    },
    onClick: action('onClick'),
  };

  return (
    <div style={{ padding: 10, backgroundColor: 'black' }}>
      <UpgradeTooltip {...defaultProps} />
    </div>
  );
});
