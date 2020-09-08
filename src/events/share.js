import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { SHARE_TYPES } from '@reducers/details-panel/share';
import { PUBLIC_LINK_ACTION_TYPES } from '@reducers/public-file-link';
import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';

import store from '../store';

const EVENT_PREFIX = 'share';
const SHARE_ITEMS_EVENT = `${EVENT_PREFIX}:items`;
const SHARE_ITEMS_ERROR_EVENT = `${EVENT_PREFIX}:itemsError`;
const SHARE_ITEMS_SUCCESS_EVENT = `${EVENT_PREFIX}:itemsSuccess`;
const SHARE_FILES_BY_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:shareFiles`;
const SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:shareFiles:error`;
const SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:shareFiles:success`;
const GENERATE_PUBLIC_LINK_EVENT = `${EVENT_PREFIX}:publicLink`;
const GENERATE_PUBLIC_LINK_ERROR_EVENT = `${EVENT_PREFIX}:publicLink:error`;
const GENERATE_PUBLIC_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:publicLink:success`;

const registerObjectsEvents = () => {
  ipcRenderer.on(SHARE_ITEMS_SUCCESS_EVENT, () => {
    /* eslint-disable-next-line no-console */
    console.log('items shared successfully');
  });

  ipcRenderer.on(SHARE_ITEMS_ERROR_EVENT, (event, error) => {
    /* eslint-disable no-console */
    console.error('Error sharing items:');
    console.error(error);
  });

  ipcRenderer.on(SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT, (_, payload) => {
    const usersNotFound = get(payload, 'usersNotFound', []) || [];

    store.dispatch({
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS,
    });

    if (usersNotFound.length > 0) {
      const props = {
        i18nKey: 'errorModal.usersNotFound',
        i18nValues: { usernames: usersNotFound.join(', ') },
      };

      store.dispatch({
        type: OPEN_MODAL,
        payload: {
          id: 'not-found-usernames',
          type: ERROR_MODAL_TOAST,
          props,
        },
      });
    }
  });

  ipcRenderer.on(SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to share files by public key:', error.message);

    store.dispatch({
      error: error.message,
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR,
    });
  });

  ipcRenderer.on(GENERATE_PUBLIC_LINK_SUCCESS_EVENT, (_, payload) => {
    store.dispatch({
      payload,
      type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_SUCCESS,
    });
  });

  ipcRenderer.on(GENERATE_PUBLIC_LINK_ERROR_EVENT, (_, error) => {
    console.error('Error generating public file link', error.message);

    store.dispatch({
      payload: error,
      type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_ERROR,
    });
  });
};

export const shareItems = (payload) => ipcRenderer.send(SHARE_ITEMS_EVENT, payload);

export const generatePublicFileLink = (payload) => {
  ipcRenderer.send(GENERATE_PUBLIC_LINK_EVENT, payload);

  store.dispatch({
    type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_GET,
  });
};

/**
 * Share files by public key
 * @param {Object} payload
 * @param {string=} payload.bucket
 * @param {Array.<string>} payload.paths
 * @param {Array.<string>} payload.publicKeys
 */
export const shareFiles = (payload) => {
  ipcRenderer.send(SHARE_FILES_BY_PUBLIC_KEY_EVENT, payload);
};

export default registerObjectsEvents;
