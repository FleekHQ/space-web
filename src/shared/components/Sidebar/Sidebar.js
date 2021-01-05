import React from 'react';
import get from 'lodash/get';
import { getShortAddress } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import SpaceSidebar from '@terminal-packages/space-ui/core/Sidebar';

import { useNavigations } from './hooks';

import {
  getMenuDropdownItems as getNewMenuItems,
  getOnMenuItemClick as getNewMenuClickHandler,
} from './new-menu-helpers';

import {
  getOnUserLogout,
  getOnSignoutReset,
  getMenuDropdownItems as getAccountItems,
  getOnMenuItemClick as getAccountItemClick,
} from './account-menu-helpers';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { specificNav } = useNavigations();

  const [
    user,
    linkedAddresses,
  ] = useSelector((state) => [
    state.user,
    state.linkedAddresses,
  ]);

  const match = matchPath(location.pathname, { path: '/home/*' });
  const prefix = get(match, 'params.0', '');

  return (
    <SpaceSidebar
      user={user}
      linkComponent={Link}
      platform={process.platform}
      navLinks={specificNav.list}
      account={{
        signoutState: { success: false },
        items: getAccountItems(t),
        label: t('account.personal'),
        onUserLogout: getOnUserLogout(dispatch),
        onSignoutReset: getOnSignoutReset(dispatch),
        onMenuItemClick: getAccountItemClick({ user, dispatch, linkedAddresses }),
        account: {
          membersNumber: 0,
          id: user.username,
          name: user.username || getShortAddress(user.address),
        },
      }}
      createNewButton={{
        prefix,
        items: getNewMenuItems(t),
        onMenuItemClick: getNewMenuClickHandler(dispatch, prefix),
      }}
    />
  );
};

export default Sidebar;
