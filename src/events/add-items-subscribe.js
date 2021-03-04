import get from 'lodash/get';
import { sdk, apiClient } from '@clients';
import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';

import { objectPresenter, createErrorObject, normalizePath } from '@utils';
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

const EVENT_NAME = 'add-items-subscribe';

const registerAddItemsSubscribeEvents = () => {
};

const notAllowedFiles = [
  '.ds_store',
];

/**
 * @typedef {Object} SourcePaths
 * @property {string} name
 * @property {string} path
 * @property {number} size
 * @property {ReadableStream} data
 * @param {Object} payload
 * @param {string} payload.bucket
 * @param {string} payload.targetPath
 * @param {Array<SourcePaths>} payload.sourcePaths
 */
export const addItems = ({
  targetPath,
  bucket = 'personal',
  sourcePaths: baseSourcePaths,
}) => async (dispatch) => {
  const storage = await sdk.getStorage();
  const users = await sdk.getUsers();
  const spaceUser = users.list()[0];
  const modalId = dispatch(openModal(UPLOAD_PROGRESS_TOAST));
  const pubKey = get(store.getState(), 'user.publicKey');

  window.onbeforeunload = () => false;

  const sourcePaths = baseSourcePaths.filter(
    (file) => !notAllowedFiles.includes(file.name.toLocaleLowerCase()),
  );

  dispatch({
    type: INIT_UPLOAD_STATE,
    payload: {
      targetPath,
      sourcePaths,
      id: modalId,
    },
  });

  let totalCompletedFiles = 0;
  const uploadResponse = await storage.addItems({
    bucket,
    files: sourcePaths.map(({ data, path, mimeType }) => ({
      data,
      path,
      mimeType,
    })),
  });

  uploadResponse.on('error', (data) => {
    // eslint-disable-next-line no-console
    console.error('SUBSCRIBE_ERROR_EVENT', data);
    const errorInfo = {
      tags: { event: EVENT_NAME, method: 'addItems' },
      extra: { path: data.path, status: data.status, bucket: data.bucket },
    };

    Sentry.captureException(data.error, errorInfo);
    LogRocket.captureException(data.error, errorInfo);

    window.onbeforeunload = null;

    if (data.files && Array.isArray(data.files)) {
      data.files.forEach((file) => {
        const currentFile = sourcePaths.find((f) => f.path === file.path);
        if (currentFile) {
          const errorObject = createErrorObject({
            bucket,
            targetPath,
            isDir: false,
            size: currentFile.size,
            sourcePath: currentFile.path,
          });
          dispatch({
            payload: errorObject,
            type: UPDATE_OR_ADD_OBJECT,
          });
        }
      });
      return;
    }

    const currentFile = sourcePaths.find((f) => f.path === normalizePath(data.path));
    const errorObject = createErrorObject({
      bucket,
      targetPath,
      isDir: false,
      size: currentFile.size,
      sourcePath: currentFile.path,
    });

    totalCompletedFiles += 1;

    dispatch({
      type: SET_UPLOAD_SUCCESS_STATE,
      payload: {
        id: modalId,
        payload: {
          result: {
            bucketPath: bucket,
            sourcePath: currentFile.path,
            error: null,
          },
          totalBytes: currentFile.size,
          completedBytes: currentFile.size,
          completedFiles: totalCompletedFiles,
          totalFiles: sourcePaths.length,
        },
      },
    });

    dispatch({
      payload: errorObject,
      type: UPDATE_OR_ADD_OBJECT,
    });
  });

  uploadResponse.on('data', (data) => {
    const currentFile = sourcePaths.find((f) => f.path === normalizePath(data.path));

    if (currentFile) {
      if (data.status === 'success') {
        totalCompletedFiles += 1;
        const lastDot = currentFile.name.lastIndexOf('.');
        const ext = currentFile.name.substring(lastDot + 1);

        const isDir = get(data, 'entry.isDir', false);

        if (!isDir) {
          apiClient.filecoin.archiveHash({
            hash: get(data, 'entry.ipfsHash'),
            publicKey: pubKey,
            token: spaceUser.token,
            size: get(data, 'entry.sizeInBytes', 0),
          }).then().catch((error) => {
            /* eslint-disable-next-line no-console */
            console.error('Error archiving hash', error);
          });
        }

        dispatch({
          type: SET_UPLOAD_SUCCESS_STATE,
          payload: {
            id: modalId,
            payload: {
              result: {
                bucketPath: bucket,
                sourcePath: currentFile.path,
                error: null,
              },
              totalBytes: currentFile.size,
              completedBytes: currentFile.size,
              completedFiles: totalCompletedFiles,
              totalFiles: sourcePaths.length,
            },
          },
        });
        dispatch({
          type: ADD_OBJECT,
          payload: objectPresenter(data.entry || {
            bucket,
            fileExtension: ext,
            backupCount: 1,
            path: currentFile.path,
            name: currentFile.name,
            sizeInBytes: currentFile.size,
            isLocallyAvailable: false,
            isBackupInProgress: false,
            created: (new Date()).toISOString(),
            updated: (new Date()).toISOString(),
            ipfsHash: '',
            isDir: false,
          }),
        });
      } else {
        dispatch({
          type: SET_UPLOAD_ERROR_STATE,
          payload: {
            id: modalId,
            error: {
              message: 'Upload error',
            },
          },
        });

        const errorObject = createErrorObject({
          bucket,
          targetPath,
          isDir: false,
          size: currentFile.size,
          sourcePath: currentFile.path,
        });
        dispatch({
          payload: errorObject,
          type: UPDATE_OR_ADD_OBJECT,
        });
      }
    } else {
      const currenFilesFromFolder = sourcePaths.filter((f) => (
        f.path.includes(normalizePath(data.path))
      ));

      if (currenFilesFromFolder.length > 0) {
        const totalFolderBytes = currenFilesFromFolder.reduce((total, file) => (
          total + file.size
        ), 0);

        dispatch({
          type: SET_UPLOAD_SUCCESS_STATE,
          payload: {
            id: modalId,
            payload: {
              result: {
                bucketPath: bucket,
                sourcePath: data.path,
                error: null,
              },
              completedBytes: 0,
              totalFiles: sourcePaths.length,
              totalBytes: totalFolderBytes,
              completedFiles: totalCompletedFiles,
            },
          },
        });
        dispatch({
          type: ADD_OBJECT,
          payload: objectPresenter({
            bucket,
            fileExtension: '',
            backupCount: 1,
            path: data.path,
            name: data.path.split('/').pop(),
            sizeInBytes: totalFolderBytes,
            isLocallyAvailable: false,
            isBackupInProgress: false,
            created: (new Date()).toISOString(),
            updated: (new Date()).toISOString(),
            ipfsHash: '',
            isDir: true,
          }),
        });
      }
    }
  });

  uploadResponse.once('done', () => {
    window.onbeforeunload = null;
  });
};

export default registerAddItemsSubscribeEvents;
