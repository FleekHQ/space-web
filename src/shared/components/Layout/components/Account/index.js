import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { faSignOut } from '@fortawesome/pro-regular-svg-icons/faSignOut';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faQuestionCircle } from '@fortawesome/pro-regular-svg-icons/faQuestionCircle';

import MenuDropdown from '@ui/MenuDropdown';
import { openModal, SETTINGS_MODAL, SIGNOUT_CONFIRMATION } from '@shared/components/Modal/actions';

import { MENU_DROPDOWN_ITEMS } from './constants';
import useStyles, { useUserBtnStyles } from './styles';

const Account = ({ account }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const btnClasses = useUserBtnStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    setAnchorEl(null);
    if (item.id === MENU_DROPDOWN_ITEMS.settings) {
      dispatch(openModal(SETTINGS_MODAL));
      return;
    }

    if (item.id === MENU_DROPDOWN_ITEMS.signout) {
      dispatch(openModal(SIGNOUT_CONFIRMATION));
      return;
    }
    // TODO: handle rest of item click
    // eslint-disable-next-line no-console
    console.log('item clicked: ', item);
  };

  return (
    <div className={classes.root}>
      <Button
        disableRipple
        disableFocusRipple
        color="inherit"
        classes={btnClasses}
        aria-describedby={id}
        endIcon={<FontAwesomeIcon icon={faAngleDown} />}
        onClick={handleClick}
      >
        <Typography noWrap color="inherit">
          {account.name}
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.rootPopover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuDropdown
          items={[
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
          ]}
          onItemClick={handleMenuItemClick}
        />
      </Popover>
      <Typography variant="body2" color="secondary">
        {t('account.personal')}
      </Typography>
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    membersNumber: PropTypes.number.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default Account;
