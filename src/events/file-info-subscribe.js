import { ipcRenderer } from 'electron';
import { objectPresenter } from '@utils';
import { UPDATE_OBJECT } from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'fileInfoSubscribe';
const FILE_INFO_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const FILE_INFO_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

/* eslint-disable no-console */
const registerFileInfoSubscribe = () => {
  ipcRenderer.on(FILE_INFO_ERROR_EVENT, (event, payload) => {
    console.error(FILE_INFO_ERROR_EVENT, payload);
  });

  ipcRenderer.on(FILE_INFO_SUCCESS_EVENT, (event, payload) => {
    console.log(FILE_INFO_SUCCESS_EVENT, objectPresenter(payload));
    store.dispatch({
      type: UPDATE_OBJECT,
      payload: objectPresenter(payload),
    });
  });
};

export default registerFileInfoSubscribe;
