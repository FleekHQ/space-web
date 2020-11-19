import React from 'react';

import { IconsTooltip } from '@ui/Table';

export default (t) => [
  {
    id: 'name',
    width: '40%',
    title: t('modules.storage.fileTable.head.name'),
    isSortable: true,
  },
  {
    id: 'size',
    width: '20%',
    title: t('modules.storage.fileTable.head.size'),
    isSortable: true,
  },
  {
    id: 'lastModified',
    width: '32%',
    title: t('modules.storage.fileTable.head.lastModified'),
    isSortable: true,
  },
  {
    id: 'iconsTooltip',
    width: '80px',
    title: <IconsTooltip />,
  },
];
