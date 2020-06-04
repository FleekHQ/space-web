import { ipcRenderer } from 'electron';
import { SET_ERROR_STATE } from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'upload';
const START_EVENT = `${EVENT_PREFIX}:start`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

const registerUploadEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, () => {
    // eslint-disable-next-line no-console
    console.log('upload completed');
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // eslint-disable-next-line no-console
    console.log('error: ', payload);
    store.dispatch({
      payload,
      type: SET_ERROR_STATE,
    });
  });
};

export const startUpload = (payload) => {
  ipcRenderer.send(START_EVENT, payload);
};

export default registerUploadEvents;
