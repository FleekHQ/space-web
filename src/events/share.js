import { ipcRenderer } from 'electron';
import { SHARE_TYPES } from '@reducers/details-panel/share';

import store from '../store';

const EVENT_PREFIX = 'share';
const GENERATE_LINK_EVENT = `${EVENT_PREFIX}:generateLink`;
const GENERATE_LINK_ERROR_EVENT = `${EVENT_PREFIX}:generateLink:error`;
const GENERATE_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:generateLink:success`;
const SHARE_ITEMS_EVENT = `${EVENT_PREFIX}:items`;
const SHARE_ITEMS_ERROR_EVENT = `${EVENT_PREFIX}:itemsError`;
const SHARE_ITEMS_SUCCESS_EVENT = `${EVENT_PREFIX}:itemsSuccess`;

const registerObjectsEvents = () => {
  ipcRenderer.on(GENERATE_LINK_ERROR_EVENT, (event, error) => {
    // eslint-disable-next-line no-console
    console.error('Error on generating link', error);
    store.dispatch({
      error: error.message,
      type: SHARE_TYPES.ON_GENERATE_LINK_ERROR,
    });
  });

  ipcRenderer.on(GENERATE_LINK_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SHARE_TYPES.ON_GENERATE_LINK_SUCCESS,
    });
  });

  ipcRenderer.on(SHARE_ITEMS_SUCCESS_EVENT, () => {
    /* eslint-disable-next-line no-console */
    console.log('items shared successfully');
  });

  ipcRenderer.on(SHARE_ITEMS_ERROR_EVENT, (event, error) => {
    /* eslint-disable no-console */
    console.error('Error sharing items:');
    console.error(error);
  });
};

export const generateLink = (payload) => {
  ipcRenderer.send(GENERATE_LINK_EVENT, payload);
};

export const shareItems = (payload) => ipcRenderer.send(SHARE_ITEMS_EVENT, payload);

export default registerObjectsEvents;
