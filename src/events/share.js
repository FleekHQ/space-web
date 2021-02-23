import { sdk, apiClient } from '@clients';

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
 * @property {string} fileName
 * @property {string} uuid
 *
 * @typedef {Object} PublicKeys
 * @property {string} id
 * @property {string} pk
 * @property {string} email
 *
 * Share files by public key
 * @param {Object} payload
 * @param {string} payload.notificationId
 * @param {Array.<Path>} payload.paths
 * @param {Array.<PublicKeys>} payload.publicKeys
 * @param {string} payload.senderName
 * @param {string} payload.origin
 */
export const shareFiles = (payload) => async (dispatch) => {
  try {
    const storage = await sdk.getStorage();
    const users = await sdk.getUsers();
    const spaceUser = users.list()[0];
    const shareViaPublicKeyPayload = {
      paths: payload.paths.map((path) => ({ bucket: path.bucket, path: path.path })),
      publicKeys: payload.publicKeys.map((key) => ({ id: key.id, pk: key.pk })),
    };
    const { publicKeys } = await storage.shareViaPublicKey(shareViaPublicKeyPayload);
    const emailPromises = [];
    payload.publicKeys.forEach((publicKey, index) => {
      const fileLink = `${origin}/file/${payload.paths[0].uuid}`;
      const invitationLink = publicKeys[index].type === 'temp' ? `${fileLink}?temp_key=${publicKeys[index].tempKey}` : fileLink;
      const emailPromise = apiClient.share.shareByEmail({
        token: spaceUser.token,
        data: {
          invitationLink,
          senderName: payload.senderName,
          fileName: payload.paths[0].fileName,
        },
        type: 'shareInvitation',
        toAddresses: [publicKey.email],
      });
      emailPromises.push(emailPromise);
    });

    Promise.all(emailPromises)
      .then(() => {
        dispatch({
          notificationId: payload.notificationId,
          type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('Failed to send share emails', e);

        dispatch({
          error: 'failedToShare',
          notificationId: payload.notificationId,
          type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR,
        });
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when trying to share a file by public key: ${error.message}`);

    dispatch({
      error: 'failedToShare',
      notificationId: payload.notificationId,
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR,
    });
  }
};

export default registerObjectsEvents;
