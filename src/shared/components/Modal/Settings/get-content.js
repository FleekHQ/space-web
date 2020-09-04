import React from 'react';

import { Security, Account } from './views';

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
  // TODO: uncomment after integration
  // {
  //   id: 'notifications',
  //   default: defaultItem === 'notifications',
  //   title: t('modals.settings.notifications.title'),
  //   content: <div>notifications</div>,
  // },
  // TODO: uncomment after integration
  // {
  //   id: 'usage',
  //   default: defaultItem === 'usage',
  //   title: t('modals.settings.usage.title'),
  //   content: (
  //     <Usage />
  //   ),
  // },
  // TODO: uncomment after integration
  // {
  //   id: 'referrals',
  //   default: defaultItem === 'referrals',
  //   title: t('modals.settings.referrals.title'),
  //   content: <div>referrals</div>,
  // },
];
