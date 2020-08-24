import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, boolean, select } from '@storybook/addon-knobs';

import Usage from './index';

const categoryName = 'Modal.Settings';

storiesOf(categoryName, module).add('Usage Tab', () => {
  const props = {
    setBackupStorage: action('setBackupStorage'),
    backupStorage: boolean('backupStorage', true),
    isFreePlan: boolean('isFreePlan', true),
    planName: text('planName', 'Free plan'),
    localUsage: object('localUsage', {
      using: 4634563,
      storage: 923552,
      transfer: 3544362,
    }),
    backupUsage: object('backupUsage', {
      storage: 4456352,
      transfer: 3544362,
      using: 43426,
      maxUsing: 435345634,
    }),
    showInfo: select('showInfo', [undefined, 'upgrade', 'backupBenefits', 'backupLimit'], undefined)
  };

  return (
    <Usage {...props} />
  );
});
