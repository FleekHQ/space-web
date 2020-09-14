import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  fetchNotifications,
  handleFilesInvitation,
  setNotificationsLastSeenAt,
  getIdentitiesByAddress,
} from '@events';
import { getAddressByPublicKey } from '@utils';
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

  const [notifications, identities] = useSelector(
    (state) => [state.notifications, state.identities.identities],
  );

  useEffect(() => {
    const addresses = notifications.data.notifications.reduce((addrs, notification) => {
      const { invitationValue } = notification;
      if (invitationValue && !identities[invitationValue.inviterPublicKey]) {
        const address = getAddressByPublicKey(invitationValue.inviterPublicKey);
        if (!addrs.includes(address)) {
          return addrs.concat(address);
        }
      }
      return addrs;
    }, []);

    if (addresses.length > 0) {
      getIdentitiesByAddress({ addresses });
    }
  }, [notifications.data.notifications.length]);

  const onCloseMenu = () => {
    setNotificationsLastSeenAt({
      timestamp: Date.now(),
    });
    setAnchorEl(null);
  };

  const onClickHandler = (event) => setAnchorEl(event.currentTarget);

  const hideNewNotifications = () => {
    const { data: { lastSeenAt, notifications: notificationsData } } = notifications;
    if (notificationsData.length === 0) {
      return true;
    }

    if (notificationsData[0].createdAt * 1000 > lastSeenAt) {
      return false;
    }

    return true;
  };

  const i18n = {
    empty: t('notifications.empty'),
    accept: t('notifications.accept'),
    reject: t('notifications.reject'),
    accepted: t('notifications.accepted'),
    rejected: t('notifications.rejected'),
    markAsRead: t('notifications.markAsRead'),
    notifications: t('notifications.notifications'),
  };

  useEffect(() => {
    // fetch stuff
    fetchNotifications({
      seek: 0,
      limit: 10,
    });
  }, []);

  const loadMore = () => {
    if (!notifications.loading && notifications.data.nextOffset) {
      fetchNotifications({
        seek: notifications.data.nextOffset,
        limit: 10,
      });
    }
  };

  const handleInvitationStatus = (accept) => (item) => {
    const notificationItems = notifications.data.notifications;
    const foundNotification = notificationItems.find(
      (notificationItem) => (notificationItem.id === item.id),
    );
    if (foundNotification) {
      handleFilesInvitation({
        id: item.id,
        invitationID: foundNotification.invitationValue.invitationID,
        accept,
      });
    }
  };

  return (
    <>
      <NotificationButton
        badgeInvisible={hideNewNotifications()}
        onClick={onClickHandler}
        className={classes.root}
      />
      <NotificationMenu
        i18n={i18n}
        items={mapDataToItems(notifications, Trans, t, classes, identities)}
        anchorEl={anchorEl}
        onCloseMenu={onCloseMenu}
        transformOrigin={{
          horizontal: 260,
        }}
        loadMore={loadMore}
        onAcceptInvitation={handleInvitationStatus(true)}
        onRejectInvitation={handleInvitationStatus(false)}
      />
    </>
  );
};

export default Notifications;
