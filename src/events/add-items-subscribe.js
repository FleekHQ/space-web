import { ipcRenderer } from 'electron';
import {
  SET_UPLOAD_SUCCESS_STATE, SET_UPLOAD_ERROR_STATE,
} from '@reducers/storage';
import {
  openModal, UPLOAD_PROGRESS_TOAST,
} from '@shared/components/Modal/actions';

import store from '../store';

const EVENT_PREFIX = 'addItemsSubscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribeEvents = () => {
  ipcRenderer.on(SUBSCRIBE_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_UPLOAD_SUCCESS_STATE,
    });
  });

  ipcRenderer.on(SUBSCRIBE_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_UPLOAD_ERROR_STATE,
    });
  });
};

export const addItems = (payload) => {
  const modalId = store.dispatch(openModal(UPLOAD_PROGRESS_TOAST));
  ipcRenderer.send(SUBSCRIBE_START_EVENT, { id: modalId, payload });
};

export default registerAddItemsSubscribeEvents;
