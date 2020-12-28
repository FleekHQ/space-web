import { testKeysAndDelete } from '@events';
import { USER_ACTION_TYPES } from '@reducers/user';
import { SIGNOUT_ACTION_TYPES } from '@reducers/auth/signout';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { faSignOut } from '@fortawesome/pro-regular-svg-icons/faSignOut';
import { faQuestionCircle } from '@fortawesome/pro-regular-svg-icons/faQuestionCircle';
import { openModal, SETTINGS_MODAL, SIGNOUT_CONFIRMATION } from '@shared/components/Modal/actions';

export const MENU_DROPDOWN_ITEMS = {
  help: 'help',
  signout: 'signout',
  settings: 'settings',
};

export const getMenuDropdownItems = (t) => [
  {
    id: MENU_DROPDOWN_ITEMS.settings,
    divider: false,
    icon: faCog,
    name: t('account.menu.settings'),
  },
  {
    id: MENU_DROPDOWN_ITEMS.help,
    divider: true,
    icon: faQuestionCircle,
    name: t('account.menu.help'),
  },
  {
    id: MENU_DROPDOWN_ITEMS.signout,
    divider: false,
    icon: faSignOut,
    name: t('account.menu.signout'),
  },
];

export const getOnUserLogout = (dispatch) => () => dispatch({
  type: USER_ACTION_TYPES.ON_USER_LOGOUT,
});

export const getOnSignoutReset = (dispatch) => () => dispatch({
  type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT_RESET,
});

export const getOnMenuItemClick = (dispatch, linkedAddresses) => (item) => {
  if (item.id === MENU_DROPDOWN_ITEMS.settings) {
    dispatch(openModal(SETTINGS_MODAL));
    return;
  }

  if (item.id === MENU_DROPDOWN_ITEMS.help) {
    window.location.href = 'mailto:hi@space.storage?subject=I have a question about Space!';
    return;
  }

  // we only ask for a password if the user DOES NOT have google/twitter account
  if (linkedAddresses.data.length === 0) {
    dispatch(openModal(SIGNOUT_CONFIRMATION));
    return;
  }

  testKeysAndDelete();
};
