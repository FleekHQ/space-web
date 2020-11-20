/* eslint-disable no-unused-vars */
import { PUBLIC_LINK_ACTION_TYPES } from '@reducers/public-file-link';

import store from '../store';

const registerObjectsEvents = () => {
};

export const shareItems = (payload) => {
};

export const generatePublicFileLink = (payload) => {
  store.dispatch({
    type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_GET,
  });
};

/**
 * Share files by public key
 * @param {Object} payload
 * @param {string=} payload.bucket
 * @param {Array.<string>} payload.paths
 * @param {Array.<string>} payload.publicKeys
 * @param {string} payload.notificationId
 */
export const shareFiles = (payload) => {
};

export default registerObjectsEvents;
