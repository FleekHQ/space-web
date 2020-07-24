import { ipcRenderer } from 'electron';
import { objectPresenter } from '@utils';
import {
  ADD_OBJECT,
  DELETE_OBJECT,
  UPDATE_OBJECT,
} from '@reducers/storage';

import store from '../store';
import { fetchObjects } from './objects';

const EVENT_PREFIX = 'eventStream';
const DATA_EVENT = `${EVENT_PREFIX}:data`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const ENTRY_ADDED_EVENT = `${EVENT_PREFIX}:ENTRY_ADDED`;
const ENTRY_DELETED_EVENT = `${EVENT_PREFIX}:ENTRY_DELETED`;
const ENTRY_UPDATED_EVENT = `${EVENT_PREFIX}:ENTRY_UPDATED`;

/* eslint-disable no-console */
const registerEventStream = () => {
  ipcRenderer.on(DATA_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(DATA_EVENT, event, payload);
    fetchObjects();
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_EVENT, event, payload);
  });

  ipcRenderer.on(ENTRY_ADDED_EVENT, (event, { bucket, ...payload }) => {
    store.dispatch({
      type: ADD_OBJECT,
      payload: objectPresenter(payload),
    });
  });

  ipcRenderer.on(ENTRY_DELETED_EVENT, (event, { bucket, ...payload }) => {
    store.dispatch({
      type: DELETE_OBJECT,
      payload: objectPresenter(payload),
    });
  });

  ipcRenderer.on(ENTRY_UPDATED_EVENT, (event, { bucket, ...payload }) => {
    store.dispatch({
      type: UPDATE_OBJECT,
      payload: objectPresenter(payload),
    });
  });
};

export default registerEventStream;
