import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NotificationMenu,
  NotificationButton,
} from '@ui/Notification';

import useStyles from './styles';

const Notifications = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const onCloseMenu = () => setAnchorEl(null);
  const onClickHandler = (event) => setAnchorEl(event.currentTarget);

  const i18n = {
    empty: t('notifications.empty'),
    accept: t('notifications.accept'),
    reject: t('notifications.reject'),
    markAsRead: t('notifications.markAsRead'),
    notifications: t('notifications.notifications'),
  };

  return (
    <>
      <NotificationButton
        badgeInvisible={false}
        onClick={onClickHandler}
        className={classes.root}
      />
      <NotificationMenu
        i18n={i18n}
        items={[]}
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
