import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { objectPresenter } from '@utils';
import {
  DELETE_OBJECT,
  UPDATE_OR_ADD_OBJECT,
} from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'eventStream';
const EVENT_STREAM_DELETE_ITEM = `${EVENT_PREFIX}:delete`;
const EVENT_STREAM_UPDATE_ITEM = `${EVENT_PREFIX}:update`;

/* eslint-disable no-console */
const registerEventStream = () => {
  ipcRenderer.on(EVENT_STREAM_UPDATE_ITEM, (event, payload) => {
    const isRootDir = get(payload, 'bucket') === 'shared-with-me';

    store.dispatch({
      type: UPDATE_OR_ADD_OBJECT,
      payload: objectPresenter(payload, isRootDir),
    });
  });

  ipcRenderer.on(EVENT_STREAM_DELETE_ITEM, (event, payload) => {
    const isRootDir = get(payload, 'bucket') === 'shared-with-me';

    store.dispatch({
      type: DELETE_OBJECT,
      payload: objectPresenter(payload, isRootDir),
    });
  });
};

export default registerEventStream;
