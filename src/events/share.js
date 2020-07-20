import { ipcRenderer } from 'electron';
import { SHARE_TYPES } from '@reducers/details-panel/share';

import store from '../store';

const EVENT_PREFIX = 'share';
const GENERATE_LINK_EVENT = `${EVENT_PREFIX}:generateLink`;
const GENERATE_LINK_ERROR_EVENT = `${EVENT_PREFIX}:generateLink:error`;
const GENERATE_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:generateLink:success`;

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
};

export const generateLink = (payload) => {
  ipcRenderer.send(GENERATE_LINK_EVENT, payload);
};

export default registerObjectsEvents;
