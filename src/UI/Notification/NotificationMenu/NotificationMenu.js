import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './styles';
import NotificationItem from '../NotificationItem';

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
    ...menuProps
  } = props;

  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={onCloseMenu}
      open={Boolean(anchorEl)}
      className={classes.root}
      PopoverClasses={{
        paper: classes.popoverPaper,
      }}
      {...menuProps}
    >
      <MenuItem className={classes.menuItem} disableRipple>
        <Typography variant="body2">
          {i18n.notifications}
        </Typography>
        <Button
          color="primary"
          onClick={onMarkAsRead}
          disabled={items.length < 1}
          className={classes.markAsReadButton}
        >
          <Typography variant="body2" color="inherit">
            {i18n.markAsRead}
          </Typography>
        </Button>
      </MenuItem>
      {items.length > 0 ? items.map((item) => (
        <NotificationItem
          key={item.id}
          i18n={i18n}
          onAccept={() => onAcceptInvitation(item)}
          onReject={() => onRejectInvitation(item)}
          {...item}
        />
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
};

NotificationMenu.propTypes = {
  onCloseMenu: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onAcceptInvitation: PropTypes.func,
  onRejectInvitation: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      ext: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  })),
  i18n: PropTypes.shape({
    empty: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    markAsRead: PropTypes.string.isRequired,
    notifications: PropTypes.string.isRequired,
  }),
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default NotificationMenu;
