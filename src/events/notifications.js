import { ipcRenderer } from 'electron';
import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';
import store from '../store';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;
const HANDLE_FILES_INVITATION = `${EVENT_PREFIX}:handleFilesInvitation`;
const HANDLE_FILES_INVITATION_SUCCESS = `${EVENT_PREFIX}:handleFilesInvitation:success`;
const HANDLE_FILES_INVITATION_ERROR = `${EVENT_PREFIX}:handleFilesInvitation:error`;
const SET_NOTIFICATIONS_LAST_SEEN_AT = `${EVENT_PREFIX}:setNotificationsLastSeenAt`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS = `${EVENT_PREFIX}:setNotificationsLastSeenAt:success`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR = `${EVENT_PREFIX}:setNotificationsLastSeenAt:error`;

const registerNotificationEvents = () => {
  ipcRenderer.on(FETCH_NOTIFICATIONS_ERROR, (_, error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

  ipcRenderer.on(FETCH_NOTIFICATIONS_SUCCESS, (_, data) => {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_SUCCESS,
      data,
    });
  });

  ipcRenderer.on(READ_NOTIFICATION_ERROR_EVENT, () => {
    // TODO: do something
  });

  ipcRenderer.on(READ_NOTIFICATION_SUCCESS_EVENT, () => {
    // TODO: do something
  });

  ipcRenderer.on(HANDLE_FILES_INVITATION_SUCCESS, () => {
  });

  ipcRenderer.on(HANDLE_FILES_INVITATION_ERROR, (_, payload, err) => {
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

    /* eslint-disable-next-line no-console */
    console.error(err);
  });

  ipcRenderer.on(SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS, () => {
  });

  ipcRenderer.on(SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR, (_, err) => {
    /* eslint-disable-next-line no-console */
    console.error(err);
  });
};

export const readNotification = (payload) => {
  ipcRenderer.send(READ_NOTIFICATION_EVENT, payload);
};

export const fetchNotifications = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS,
  });
  ipcRenderer.send(FETCH_NOTIFICATIONS, payload);
};

export const handleFilesInvitation = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
    status: payload.accept ? 'ACCEPTED' : 'REJECTED',
    ...payload,
  });
  ipcRenderer.send(HANDLE_FILES_INVITATION, payload);
};

export const setNotificationsLastSeenAt = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS_LAST_SEEN_AT,
    lastSeenAt: payload.timestamp,
  });
  ipcRenderer.send(SET_NOTIFICATIONS_LAST_SEEN_AT, payload);
};

export default registerNotificationEvents;
