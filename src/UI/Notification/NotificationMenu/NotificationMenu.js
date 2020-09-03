import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './styles';
import ShareNotificationItem from '../NotificationItem';
import BackupNotificationItem from '../BackUpLimitItem';

/* eslint-disable react/jsx-props-no-spreading */
const NotificationMenu = (props) => {
  const {
    i18n,
    items,
    anchorEl,
    onCloseMenu,
    onMarkAsRead,
    onAcceptInvitation,
    onRejectInvitation,
    upgradeOnClick,
    loadMore,
    ...menuProps
  } = props;

  const classes = useStyles();

  const getNotificationItem = (item) => {
    switch (item.type) {
      case 'share-invite':
        return (
          <ShareNotificationItem
            key={item.id}
            i18n={i18n}
            onAccept={() => onAcceptInvitation(item)}
            onReject={() => onRejectInvitation(item)}
            {...item}
          />
        );
      case 'backup-limit':
      default:
        return (
          <BackupNotificationItem
            key={item.id}
            upgradeOnClick={() => upgradeOnClick(item)}
            {...item}
          />
        );
    }
  };

  const onScroll = (e) => {
    const deadband = 20;
    const scrollDiff = e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight;
    const isBottom = scrollDiff <= deadband;
    if (isBottom) {
      loadMore();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={onCloseMenu}
      open={Boolean(anchorEl)}
      className={classes.root}
      PopoverClasses={{
        paper: classes.popoverPaper,
      }}
      onScroll={onScroll}
      {...menuProps}
    >
      <MenuItem className={classes.menuItem} disableRipple>
        <Typography variant="body2">
          {i18n.notifications}
        </Typography>
      </MenuItem>
      {items.length > 0 ? items.map((item) => (
        getNotificationItem(item)
      )) : (
        <MenuItem className={classes.menuItem} disableRipple>
          <Typography
            variant="body2"
            align="center"
            className={classes.empty}
          >
            {i18n.empty}
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

NotificationMenu.defaultProps = {
  i18n: {},
  items: [],
  anchorEl: null,
  onCloseMenu: () => {},
  onMarkAsRead: () => {},
  onAcceptInvitation: () => {},
  onRejectInvitation: () => {},
  upgradeOnClick: () => {},
  loadMore: () => {},
};

NotificationMenu.propTypes = {
  loadMore: PropTypes.func,
  onCloseMenu: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onAcceptInvitation: PropTypes.func,
  onRejectInvitation: PropTypes.func,
  upgradeOnClick: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    username: PropTypes.string,
    description: PropTypes.element,
    timestamp: PropTypes.number.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      ext: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  })),
  i18n: PropTypes.shape({
    empty: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    notifications: PropTypes.string.isRequired,
  }),
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default NotificationMenu;
