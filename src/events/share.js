// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { SHARE_TYPES } from '@reducers/details-panel/share';
import { PUBLIC_LINK_ACTION_TYPES } from '@reducers/public-file-link';
import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';
import { UPDATE_SHARE_AMOUNT_OBJECTS } from '@reducers/storage/bucket';

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
