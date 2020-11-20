import {
  INIT_UPLOAD_STATE,
} from '@reducers/storage';
import {
  openModal, UPLOAD_PROGRESS_TOAST,
} from '@shared/components/Modal/actions';

import store from '../store';

const registerAddItemsSubscribeEvents = () => {
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
};

export default registerAddItemsSubscribeEvents;
