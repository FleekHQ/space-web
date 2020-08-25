import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchNotifications,
} from '@events';
import {
  NotificationMenu,
  NotificationButton,
} from '@ui/Notification';
import { useSelector } from 'react-redux';
import mapDataToItems from './utils/map-data-to-items';

import useStyles from './styles';

const Notifications = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const onCloseMenu = () => setAnchorEl(null);
  const onClickHandler = (event) => setAnchorEl(event.currentTarget);

  const notifications = useSelector((state) => state.notifications);

  const i18n = {
    empty: t('notifications.empty'),
    accept: t('notifications.accept'),
    reject: t('notifications.reject'),
    markAsRead: t('notifications.markAsRead'),
    notifications: t('notifications.notifications'),
  };

  useEffect(() => {
    // fetch stuff
    fetchNotifications({
      seek: 0,
      limit: 2,
    });
    // TODO: subscription to notifications
    // TODO: implement infinite scrolling. need more so infinite scrolling works with subcription...
  }, []);

  return (
    <>
      <NotificationButton
        badgeInvisible={false}
        onClick={onClickHandler}
        className={classes.root}
      />
      <NotificationMenu
        i18n={i18n}
        items={mapDataToItems(notifications)}
        anchorEl={anchorEl}
        onCloseMenu={onCloseMenu}
        transformOrigin={{
          horizontal: 260,
          vertical: -45,
        }}
      />
    </>
  );
};

export default Notifications;
