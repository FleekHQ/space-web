import { sdk } from '@clients';

import { objectPresenter } from '@utils';
import {
  SET_UPLOAD_SUCCESS_STATE,
  // SET_UPLOAD_ERROR_STATE,
  INIT_UPLOAD_STATE,
  ADD_OBJECT,
  // UPDATE_OR_ADD_OBJECT,
} from '@reducers/storage';
import {
  openModal, UPLOAD_PROGRESS_TOAST,
} from '@shared/components/Modal/actions';

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
export const addItems = (payload) => async (dispatch) => {
  const { storage } = await sdk;
  const modalId = dispatch(openModal(UPLOAD_PROGRESS_TOAST));

  dispatch({
    type: INIT_UPLOAD_STATE,
    payload: {
      id: modalId,
      targetPath: payload.targetPath,
      sourcePaths: payload.sourcePaths,
    },
  });

  const uploadResponse = await storage.addItems({
    bucket: 'personal',
    files: payload.sourcePaths.map(({ data, path }) => ({ data, path })),
  });

  uploadResponse.once('done', (data) => {
    const totalBytes = payload.sourcePaths.reduce((total, currentFile) => (
      total + currentFile.size
    ), 0);

    const completedFiles = data.files.reduce((total, currentFile) => {
      if (currentFile.status === 'success') {
        return total + 1;
      }

      return total;
    }, 0);

    data.files.forEach((file) => {
      const currentFile = payload.sourcePaths.find((f) => f.path === file.path);

      if (currentFile) {
        if (file.status === 'success') {
          const lastDot = currentFile.name.lastIndexOf('.');
          const ext = currentFile.name.substring(lastDot + 1);

          dispatch({
            type: SET_UPLOAD_SUCCESS_STATE,
            payload: {
              id: modalId,
              payload: {
                result: {
                  sourcePath: currentFile.path,
                  bucketPath: 'personal',
                  error: null,
                },
                completedFiles,
                totalBytes,
                completedBytes: totalBytes,
                totalFiles: data.files.length,
              },
            },
          });
          dispatch({
            type: ADD_OBJECT,
            payload: objectPresenter({
              bucket: 'personal',
              fileExtension: ext,
              backupCount: 0,
              path: currentFile.path,
              name: currentFile.name,
              sizeInBytes: totalBytes,
              isLocallyAvailable: false,
              created: (new Date()).toISOString(),
              updated: (new Date()).toISOString(),
              ipfsHash: '',
              isDir: false,
            }),
          });
        }
      }
    });
  });
};

export default registerAddItemsSubscribeEvents;
