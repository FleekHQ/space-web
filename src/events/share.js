// import { sdk } from '@clients';

// import { SHARE_TYPES } from '@reducers/details-panel/share';
import { SHARE_TYPES } from '@reducers/details-panel/share';
import { PUBLIC_LINK_ACTION_TYPES } from '@reducers/public-file-link';
// import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';
// import { UPDATE_SHARE_AMOUNT_OBJECTS } from '@reducers/storage/bucket';

import store from '../store';

const registerObjectsEvents = () => {
};

export const shareItems = () => {
};

export const generatePublicFileLink = () => {
  store.dispatch({
    type: PUBLIC_LINK_ACTION_TYPES.PUBLIC_LINK_ON_GET,
  });
};

/**
 * @typedef {Object} Path
 * @property {string} dbId
 * @property {string} path
 * @property {string} bucket
 *
 * @typedef {Object} PublicKeys
 * @property {string} id
 * @property {string} pk
 * @property {string} bucket
 *
 * Share files by public key
 * @param {Object} payload
 * @param {string} payload.notificationId
 * @param {Array.<Path>} payload.paths
 * @param {Array.<PublicKeys>} payload.publicKeys
 */
export const shareFiles = (payload) => async (dispatch) => {
  setTimeout(() => {
    dispatch({
      notificationId: payload.notificationId,
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS,
    });
  }, 3000);

  // Uncomment when shareFilesViaPublicKey is released
  /* try {
    const storage = await sdk.getStorage();
    await storage.shareFilesViaPublicKey({
      paths: payload.paths,
      publicKeys: payload.publicKeys,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when trying to share a file by public key: ${error.message}`);

    dispatch({
      error: 'failedToShare',
      notificationId: payload.notificationId,
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR,
    });
  } */
};

export default registerObjectsEvents;
