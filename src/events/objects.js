// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { objectPresenter } from '@utils';
import { sdk } from '@clients';
import {
  STORE_DIR,
  STORE_OBJECTS,
  SET_LOADING_STATE_BUCKET,
  SET_ERROR_BUCKET,
  SET_LOADING_STATE,
  SET_OPEN_ERROR_BUCKET,
  UPDATE_OBJECT,
} from '@reducers/storage';
import { SEARCH_ACTION_TYPES } from '@reducers/search';
import { OPEN_PUBLIC_FILE_ACTION_TYPES } from '@reducers/open-public-file';
import { DELETE_OBJECT_ACTION_TYPES } from '@reducers/delete-object';

import store from '../store';

const ERROR_TIMEOUT = 5000;
// let openErrorTimeout = null;

const listDirectory = async (path, bucket, fetchSubFolders) => {
  const { storage } = await sdk;

  try {
    const { items: entries } = await storage.listDirectory({
      path,
      bucket,
      recursive: false,
    });

    /* eslint-disable-next-line no-console */
    console.log('entries', entries);

    const objects = entries.map((entry) => objectPresenter({
      bucket,
      path: entry.path,
      name: entry.name,
      isDir: entry.isDir,
      created: '2020-12-30T14:28:21-03:00',
      updated: '2020-12-30T14:28:21-03:00',
      ipfsHash: entry.ipfsHash,
      sizeInBytes: entry.sizeInBytes,
      backupCount: entry.backupCount,
      fileExtension: entry.fileExtension,
      isLocallyAvailable: entry.isLocallyAvailable,
      members: entry.members.map((member) => ({
        address: member.address,
        publicKey: member.publicKey,
      })),
    }));

    store.dispatch({
      payload: {
        bucket,
        loading: false,
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      payload: objects,
      type: STORE_DIR,
    });

    if (fetchSubFolders) {
      const fetchSubDirs = entries
        .filter((entry) => entry.isDir)
        .map((entry) => entry.path.replace(/^\//, ''))
        .map((subDir) => listDirectory(subDir, bucket, false));

      await Promise.all(fetchSubDirs);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    store.dispatch({
      payload: { bucket, error },
      type: SET_ERROR_BUCKET,
    });
  }
};

const registerObjectsEvents = () => {
};

export const fetchSharedObjects = (seek = '', limit = 100) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket: 'shared-with-me',
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  // TODO: remove mock
  setTimeout(() => {
    store.dispatch({
      payload: {
        loading: false,
        bucket: 'shared-with-me',
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      type: STORE_DIR,
      payload: [
        {
          key: 'hello7 copy.txt',
          ext: 'txt',
          dbId: '',
          type: 'file',
          name: 'hello7 copy.txt',
          size: 97,
          bucket: 'shared-with-me',
          members: [
            {
              address: '0x8c69a8c9b104a05f3d131b92da6bfd5d23c6',
              publicKey: '7979f71095b4cd209d827ddb143c02004e90225e0606a3d8c9a9e967ffa86466',
            },
            {
              address: '0xa6d52d390bb4ebac5865ea3e8774bcc2eb96',
              publicKey: '6d4e6ba704f1f4cd65a7f7008235d7048a2b917c27948945f4e36b7ff40e23a8',
            },
          ],
          created: '2020-11-20T20:26:15.000Z',
          bytesSize: '97.00 Bytes',
          lastModified: '2020-11-20T20:26:27.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'shared-with-me/hello7 copy.txt',
          fullKey: 'shared-with-me/hello7 copy.txt',
          ipfsHash: 'bafkreidfc3urh374v3t4uxmvnm2mpn6bprl3wkhusenzhbpweuscs5sylm',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 2,
        },
        {
          key: 'my-folder',
          ext: 'folder',
          type: 'folder',
          name: 'my-folder',
          size: 141,
          bucket: 'shared-with-me',
          members: [],
          created: '2020-12-30T17:27:14.000Z',
          bytesSize: '141.00 B',
          error: false,
          lastModified: '2020-12-30T17:27:14.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'shared-with-me/my-folder',
          fullKey: 'shared-with-me/my-folder',
          ipfsHash: 'QmTdw5ca9ztdmQ1ffnridhV28sfpXQBNWTwca6Zss7X1RC',
          isAvailableInSpace: false,
          sourceBucket: 'shared-with-me',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'my-folder-file',
          ext: 'txt',
          type: 'file',
          name: 'my-folder-file',
          size: 141,
          bucket: 'shared-with-me',
          members: [],
          created: '2020-12-30T17:27:14.000Z',
          bytesSize: '141.00 B',
          error: false,
          lastModified: '2020-12-30T17:27:14.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'shared-with-me/my-folder/my-folder-file.txt',
          fullKey: 'shared-with-me/my-folder/my-folder-file.txt',
          ipfsHash: 'QmTdw5ca9ztdmQ1ffnridhV28sfpXQBNWTwca6Zss7X1RC',
          isAvailableInSpace: false,
          sourceBucket: 'shared-with-me',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
      ],
    });
  }, 1000);
};

export const fetchDir = async (path = '', bucket = 'personal', fetchSubFolders = true) => {
  store.dispatch({
    payload: {
      bucket,
      loading: true,
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  await listDirectory(path, bucket, fetchSubFolders);
};

export const openObject = ({
  path,
  dbId,
  name,
  fullKey,
  ipfsHash,
  isPublicLink = false,
  bucket = 'personal',
}) => {
  if (isPublicLink) {
    // return;
  }
};

export const openPublicFile = (payload) => {
  store.dispatch({
    type: OPEN_PUBLIC_FILE_ACTION_TYPES.ON_OPEN,
  });
};

export const searchFiles = (searchTerm) => {
  store.dispatch({
    type: SEARCH_ACTION_TYPES.SET_SEARCHTERM,
    payload: searchTerm,
  });

  if (searchTerm === '') {
    store.dispatch({
      type: SEARCH_ACTION_TYPES.SET_RESULTS,
      payload: null,
    });
  }
};

export const deleteObject = (payload) => {
  store.dispatch({
    type: DELETE_OBJECT_ACTION_TYPES.ON_SUBMIT,
  });
};

export default registerObjectsEvents;
