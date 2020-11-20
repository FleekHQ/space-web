/* eslint-disable no-unused-vars */
import {
  STORE_DIR,
  SET_LOADING_STATE,
  SET_LOADING_STATE_BUCKET,
} from '@reducers/storage';
import { SEARCH_ACTION_TYPES } from '@reducers/search';
import { OPEN_PUBLIC_FILE_ACTION_TYPES } from '@reducers/open-public-file';

import store from '../store';

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
      ],
    });
  }, 1000);
};

export const fetchObjects = (bucket = 'personal') => {
  store.dispatch({
    payload: true,
    type: SET_LOADING_STATE,
  });
};

export const fetchDir = (path = '', bucket = 'personal', fetchSubFolders = true) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket,
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  // TODO: remove mock
  setTimeout(() => {
    store.dispatch({
      payload: {
        loading: false,
        bucket: 'personal',
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      type: STORE_DIR,
      payload: [
        {
          key: 'hello7 copy.txt',
          ext: 'txt',
          type: 'file',
          name: 'hello7 copy.txt',
          size: 97,
          bucket: 'personal',
          members: [],
          created: '2020-11-20T20:17:09.000Z',
          bytesSize: '97.00 Bytes',
          lastModified: '2020-11-20T20:17:09.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/hello7 copy.txt',
          fullKey: 'personal/hello7 copy.txt',
          ipfsHash: 'bafkreif3wsqbb6v5x6uh7nzz6aky63pztgdzcqxs36p4sadhp3w5n5udou',
          isAvailableInSpace: false,
          sourceBucket: 'personal',
          shareAmount: 1,
        },
        {
          key: 'hello.txt',
          ext: 'txt',
          type: 'file',
          name: 'hello.txt',
          size: 97,
          bucket: 'personal',
          members: [],
          created: '2020-11-20T20:17:08.000Z',
          bytesSize: '97.00 Bytes',
          lastModified: '2020-11-20T20:17:08.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/hello.txt',
          fullKey: 'personal/hello.txt',
          ipfsHash: 'bafkreidd4tulvhvgvgp4pmj7ne4mtrblionurqwmau235toxnconozmbb4',
          isAvailableInSpace: false,
          sourceBucket: 'personal',
          shareAmount: 1,
        },
      ],
    });
  }, 1000);
};

export const openObject = ({
  path,
  dbId,
  name,
  ipfsHash,
  isPublicLink = false,
  bucket = 'personal',
}) => {
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

export default registerObjectsEvents;
