import { objectPresenter } from '@utils';
import { sdk } from '@clients';
import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';

import store from '../store';
import { CREATE_FOLDER_ACTION_TYPES } from '../reducers/create-folder';

const EVENT_NAME = 'folder';

/* eslint-disable no-console, import/prefer-default-export */
/**
 * create folder event
 * @param {Object} payload
 * @param {string} payload.path
 * @param {string} payload.folderName - Name of the folder
 * @param {string=} payload.bucket - Bucket to create the folder. Default is personal
 */
export const createFolder = async (payload) => {
  store.dispatch({
    type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT,
  });

  const storage = await sdk.getStorage();

  const {
    path,
    folderName,
    bucket = 'personal',
  } = payload;

  const folderPath = path.length === 0 ? folderName : `${path}/${folderName}`;

  try {
    await storage.createFolder({
      bucket,
      path: folderPath,
    });

    store.dispatch({
      type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_SUCCESS,
      payload: objectPresenter({
        bucket,
        isDir: true,
        ipfsHash: '',
        sizeInBytes: 0,
        backupCount: 0,
        path: folderPath,
        name: folderName,
        fileExtension: '',
        isLocallyAvailable: false,
        created: (new Date()).toISOString(),
        updated: (new Date()).toISOString(),
      }),
    });
  } catch (error) {
    const errorInfo = {
      tags: { event: EVENT_NAME, method: 'createFolder' },
      extra: { ...payload },
    };

    Sentry.captureException(error, errorInfo);
    LogRocket.captureException(error, errorInfo);
    console.error('Error creating a new folder', error);

    store.dispatch({
      error: error.message,
      type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  }
};
