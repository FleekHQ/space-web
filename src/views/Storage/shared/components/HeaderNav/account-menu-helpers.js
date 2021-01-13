import { signout } from '@events';
import { faSignOut } from '@fortawesome/pro-regular-svg-icons/faSignOut';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';

export const MENU_DROPDOWN_ITEMS = {
  help: 'help',
  signout: 'signout',
  settings: 'settings',
};

export const getMenuDropdownItems = (t) => [
  {
    id: MENU_DROPDOWN_ITEMS.signout,
    divider: false,
    icon: faSignOut,
    name: t('account.menu.signout'),
  },
];

export const getOnMenuItemClick = ({ user, dispatch }) => (item) => {
  if (item.id === MENU_DROPDOWN_ITEMS.settings) {
    dispatch(openModal(SETTINGS_MODAL));
    return;
  }

  if (item.id === MENU_DROPDOWN_ITEMS.help) {
    window.location.href = 'mailto:hi@space.storage?subject=I have a question about Space!';
    return;
  }

  dispatch(signout(user));
};
