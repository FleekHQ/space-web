// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import { objectPresenter } from '@utils';
import {
  SET_UPLOAD_SUCCESS_STATE,
  SET_UPLOAD_ERROR_STATE,
  INIT_UPLOAD_STATE,
  ADD_OBJECT,
  UPDATE_OR_ADD_OBJECT,
} from '@reducers/storage';
import {
  openModal, UPLOAD_PROGRESS_TOAST,
} from '@shared/components/Modal/actions';

import store from '../store';

const registerAddItemsSubscribeEvents = () => {
};

/**
 * @typedef {Object} SourcePaths
 * @property {string} name
 * @property {string} path
 * @property {ReadableStream} data
 * @param {Object} payload
 * @param {string} payload.targetPath
 * @param {Array<SourcePaths>} payload.sourcePaths
 */
export const addItems = (payload) => {
  const modalId = store.dispatch(openModal(UPLOAD_PROGRESS_TOAST));

  // eslint-disable-next-line no-console
  console.log('Add Items payload:', payload);
  store.dispatch({
    type: INIT_UPLOAD_STATE,
    payload: {
      id: modalId,
      targetPath: payload.targetPath,
      sourcePaths: payload.sourcePaths,
    },
  });
};

export default registerAddItemsSubscribeEvents;
