import React from 'react';

import { Security, Account, Usage } from './views';

export default (t) => [
  {
    id: 'account',
    default: true,
    title: t('modals.settings.account.title'),
    content: <Account />,
  },
  {
    id: 'security',
    title: t('modals.settings.security.title'),
    content: <Security t={t} />,
  },
  {
    id: 'notifications',
    title: t('modals.settings.notifications.title'),
    content: <div>notifications</div>,
  },
  {
    id: 'usage',
    title: t('modals.settings.usage.title'),
    content: (
      <Usage
        setBackupStorage={() => {}}
        backupStorage
        isFreePlan
        planName="Free plan"
        localUsage={{
          using: 4634563,
          storage: 923552,
          transfer: 3544362,
        }}
        backupUsage={{
          storage: 4456352,
          transfer: 3544362,
          using: 43426,
          maxUsing: 435345634,
        }}
      />
    ),
  },
  {
    id: 'referrals',
    title: t('modals.settings.referrals.title'),
    content: <div>referrals</div>,
  },
];
