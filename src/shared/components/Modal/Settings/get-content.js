import React from 'react';

import { Security, Account, Usage } from './views';

export default ({
  t,
  closeModal,
  defaultItem,
}) => [
  {
    id: 'account',
    default: defaultItem === 'account',
    title: t('modals.settings.account.title'),
    content: <Account closeMainModal={closeModal} />,
  },
  {
    id: 'security',
    default: defaultItem === 'security',
    title: t('modals.settings.security.title'),
    content: <Security t={t} />,
  },
  {
    id: 'notifications',
    default: defaultItem === 'notifications',
    title: t('modals.settings.notifications.title'),
    content: <div>notifications</div>,
  },
  {
    id: 'usage',
    default: defaultItem === 'usage',
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
    default: defaultItem === 'referrals',
    title: t('modals.settings.referrals.title'),
    content: <div>referrals</div>,
  },
];
