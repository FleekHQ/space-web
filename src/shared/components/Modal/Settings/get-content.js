import React from 'react';

import {
  Usage,
  Account,
  Security,
  ProductKey,
} from './views';

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
  /*  {
    id: 'notifications',
    default: defaultItem === 'notifications',
    title: t('modals.settings.notifications.title'),
    content: <div>notifications</div>,
  }, */
  {
    id: 'usage',
    default: defaultItem === 'usage',
    title: t('modals.settings.usage.title'),
    content: (
      <Usage />
    ),
  },
  /* {
    id: 'referrals',
    default: defaultItem === 'referrals',
    title: t('modals.settings.referrals.title'),
    content: <div>referrals</div>,
  }, */
  {
    id: 'product-key',
    default: defaultItem === 'product-key',
    title: t('modals.settings.productKey.title'),
    content: <ProductKey t={t} />,
  },
];
