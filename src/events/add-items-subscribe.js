import { ipcRenderer } from 'electron';
import { objectPresenter } from '@utils';
import {
  SET_UPLOAD_SUCCESS_STATE,
  SET_UPLOAD_ERROR_STATE,
  INIT_UPLOAD_STATE,
  ADD_OBJECT,
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
    store.dispatch({
      type: ADD_OBJECT,
      payload: objectPresenter(payload.object),
    });
  });

  ipcRenderer.on(SUBSCRIBE_ERROR_EVENT, (event, error) => {
    store.dispatch({
      payload: error,
      type: SET_UPLOAD_ERROR_STATE,
    });
  });
};

/**
 * @param {Object} payload
 * @param {string} payload.targetPath
 * @param {Array<string>} payload.sourcePaths
 */
export const addItems = (payload) => {
  const modalId = store.dispatch(openModal(UPLOAD_PROGRESS_TOAST));
  store.dispatch({
    type: INIT_UPLOAD_STATE,
    payload: {
      id: modalId,
      sourcePaths: payload.sourcePaths,
      targetPath: payload.targetPath,
    },
  });
  ipcRenderer.send(SUBSCRIBE_START_EVENT, { id: modalId, payload });
};

export default registerAddItemsSubscribeEvents;
