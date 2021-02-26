// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */

import { sdk } from '@clients';
import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';
import { notificationPresenter } from '@utils';
import { fetchSharedObjects } from './objects';

import store from '../store';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';

/* eslint-disable no-console */
const registerNotificationEvents = (history) => {
};

export const readNotification = (payload) => {
};

export const fetchNotifications = async (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS,
  });

  try {
    const storage = await sdk.getStorage();

    const {
      notifications,
      ...restData
    } = await storage.getNotifications(payload);
    const mappedNotifications = notifications.map(
      (notification) => notificationPresenter(notification),
    );
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_SUCCESS,
      data: {
        ...restData,
        notifications: mappedNotifications,
      },
    });
  } catch (e) {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_ERROR,
      error: e,
    });
  }
};

export const handleFilesInvitation = async (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
    status: payload.accept ? 'ACCEPTING' : 'REJECTING',
    ...payload,
  });

  try {
    const storage = await sdk.getStorage();
    await storage.handleFileInvitation(payload.invitationID, payload.accept);

    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
      status: payload.accept ? 'ACCEPTED' : 'REJECTED',
      ...payload,
    });

    if (payload.accept) {
      fetchSharedObjects();
      payload.history.push('/shared');
    }
  } catch (e) {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
      status: 'PENDING',
      ...payload,
    });

    const props = {
      i18nKey: 'errorModal.handleInvitationFailed',
    };

    store.dispatch({
      type: OPEN_MODAL,
      payload: {
        id: 'handle-invitation-failed',
        type: ERROR_MODAL_TOAST,
        props,
      },
    });
    console.error('Failed to update invitation status', e);
  }
};

export const setNotificationsLastSeenAt = async (payload) => {
  try {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS_LAST_SEEN_AT,
      lastSeenAt: payload.timestamp,
    });

    const storage = await sdk.getStorage();
    await storage.setNotificationsLastSeenAt(payload.timestamp);
  } catch (e) {
    console.error('Failed to setNotificationsLastSeenAt', e);
  }
};

export default registerNotificationEvents;
