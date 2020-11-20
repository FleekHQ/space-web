import React from 'react';

import { IconsTooltip } from '@ui/Table';

export default (t) => [
  {
    width: '40%',
    title: t('modules.storage.fileTable.head.name'),
  },
  {
    width: '20%',
    title: t('modules.storage.fileTable.head.size'),
  },
  {
    width: '32%',
    title: t('modules.storage.fileTable.head.lastModified'),
  },
  {
    width: '80px',
    title: <IconsTooltip />,
  },
];
