import { ipcRenderer } from 'electron';
import { SET_UPLOAD_ERROR_STATE } from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'addItemsSuscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribeEvents = () => {
  ipcRenderer.on(SUBSCRIBE_SUCCESS_EVENT, (event, payload) => {
    // eslint-disable-next-line no-console
    console.log('upload completed: ', payload);
  });

  ipcRenderer.on(SUBSCRIBE_ERROR_EVENT, (event, payload) => {
    // eslint-disable-next-line no-console
    console.error('Error on adding item: ', payload);
    store.dispatch({
      payload,
      type: SET_UPLOAD_ERROR_STATE,
    });
  });
};

export const addItems = (payload) => {
  ipcRenderer.send(SUBSCRIBE_START_EVENT, payload);
};

export default registerAddItemsSubscribeEvents;
