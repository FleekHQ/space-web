import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/faAngleRight';
import palette from '@terminal-packages/space-ui/core/theme/palette';

import AvatarsList from '@ui/AvatarsList';
import Breadcrumb from '@shared/components/Breadcrumb';

import { useLocation, useRouteMatch } from 'react-router-dom';

import helper from './helper';

// TODO: remove this.
const MEMBERS_LIST_MOCK = [
  {
    address: '0xa918f05a2a980f58737aa913553c8d6ea1aa',
    publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3aa',
    isOwner: false,
  },
  {
    address: '0xa918f05a2a980f58737aa913553c8d6ea1ab',
    publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3ab',
    isOwner: false,
  },
  {
    address: '0xa918f05a2a980f58737aa913553c8d6ea1ac',
    publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3ac',
    isOwner: false,
  },
  {
    address: '0xa918f05a2a980f58737aa913553c8d6ea1ad',
    publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3ad',
    isOwner: false,
  },
  {
    address: '0xa918f05a2a980f58737aa913553c8d6ea1ae',
    publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3ae',
    isOwner: false,
  },
];

const SharedByBreadcrumbs = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();

  const [bucketBreadcrumbOption, ...breadcrumbOptions] = helper.getBreadcrumbOptions({ location });

  return (
    <Breadcrumbs
      aria-label="shared-by-breadcrumbs"
      separator={(
        <FontAwesomeIcon color={palette.gray1} icon={faAngleRight} />
      )}
    >
      <Breadcrumb name={t('navigation.shared-by')} link={match.path} />
      {
        bucketBreadcrumbOption && (
          <Breadcrumb
            name={bucketBreadcrumbOption.name}
            link={bucketBreadcrumbOption.link}
            startAdornment={<AvatarsList size="normal" maxVisible={4} usersList={MEMBERS_LIST_MOCK} />}
          />
        )
      }
      {
        breadcrumbOptions && breadcrumbOptions.map((option) => (
          <Breadcrumb
            link={option.link}
            name={option.name}
            imgUrl={option.imgUrl}
          />
        ))
      }
    </Breadcrumbs>
  );
};

export default SharedByBreadcrumbs;
