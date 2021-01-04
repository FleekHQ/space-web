// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { objectPresenter } from '@utils';
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
        {
          key: 'Presentation.pptx',
          ext: 'pptx',
          type: 'file',
          name: 'Presentation.pptx',
          size: 265560,
          bucket: 'personal',
          members: [
            {
              address: '0x184f5a9bfaf394ed2ba1c49ef839e04e2c61',
              publicKey: 'b44922d71328f4e03345ef47f0616df8b4efd7cc3422f1557d3d7a743b623635',
            },
          ],
          created: '2020-12-30T17:28:10.000Z',
          bytesSize: '259.34 KB',
          error: false,
          lastModified: '2020-12-30T17:28:10.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/Presentation.pptx',
          fullKey: 'personal/Presentation.pptx',
          ipfsHash: 'bafybeibnvaqmkavkltsixk6gfz6754ryocrthdvt4g2srqdvyhu7a2we44',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'Welcome to Word.docx',
          ext: 'docx',
          type: 'file',
          name: 'Welcome to Word.docx',
          size: 1373590,
          bucket: 'personal',
          members: [
            {
              address: '0x184f5a9bfaf394ed2ba1c49ef839e04e2c61',
              publicKey: 'b44922d71328f4e03345ef47f0616df8b4efd7cc3422f1557d3d7a743b623635',
            },
          ],
          created: '2020-12-30T17:28:01.000Z',
          bytesSize: '1.31 MB',
          error: false,
          lastModified: '2020-12-30T17:28:01.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/Welcome to Word.docx',
          fullKey: 'personal/Welcome to Word.docx',
          ipfsHash: 'bafybeigmefjrjqh2o6rpaypaewkzngyntoiozp4dtlemtyptjlzbzgdl4y',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'List.xlsx',
          ext: 'xlsx',
          type: 'file',
          name: 'List.xlsx',
          size: 10788,
          bucket: 'personal',
          members: [
            {
              address: '0x184f5a9bfaf394ed2ba1c49ef839e04e2c61',
              publicKey: 'b44922d71328f4e03345ef47f0616df8b4efd7cc3422f1557d3d7a743b623635',
            },
          ],
          created: '2020-12-30T17:28:11.000Z',
          bytesSize: '10.54 KB',
          error: false,
          lastModified: '2020-12-30T17:28:11.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/List.xlsx',
          fullKey: 'personal/List.xlsx',
          ipfsHash: 'bafkreigmuhr7sdsopdnad54sgkyddbcqex7iov5uhkkt27ctsubtmqkgjy',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'image.jpg',
          ext: 'jpg',
          type: 'file',
          name: 'image.jpg',
          size: 204487,
          bucket: 'personal',
          members: [
            {
              address: '0x184f5a9bfaf394ed2ba1c49ef839e04e2c61',
              publicKey: 'b44922d71328f4e03345ef47f0616df8b4efd7cc3422f1557d3d7a743b623635',
            },
          ],
          created: '2020-12-30T17:28:04.000Z',
          bytesSize: '199.69 KB',
          error: false,
          lastModified: '2020-12-30T17:28:04.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/image.jpg',
          fullKey: 'personal/image.jpg',
          ipfsHash: 'bafkreiepw2l73yfhupd7tumzco6az2mvw7d6oeyot4u7quitq4z7x2kz3m',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'list_of_things.txt',
          ext: 'txt',
          type: 'file',
          name: 'list_of_things.txt',
          size: 5,
          bucket: 'personal',
          members: [
            {
              address: '0x184f5a9bfaf394ed2ba1c49ef839e04e2c61',
              publicKey: 'b44922d71328f4e03345ef47f0616df8b4efd7cc3422f1557d3d7a743b623635',
            },
          ],
          created: '2020-12-30T17:28:21.000Z',
          bytesSize: '5.00 B',
          error: false,
          lastModified: '2020-12-30T17:28:21.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/list_of_things.txt',
          fullKey: 'personal/list_of_things.txt',
          ipfsHash: 'bafkreibkmxcduhjhqow7uvrwg6pdc46fz2srd5uhux2b553zmlft7eu57i',
          isAvailableInSpace: true,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
        {
          key: 'my-folder',
          ext: 'folder',
          type: 'folder',
          name: 'my-folder',
          size: 141,
          bucket: 'personal',
          members: [],
          created: '2020-12-30T17:27:14.000Z',
          bytesSize: '141.00 B',
          error: false,
          lastModified: '2020-12-30T17:27:14.000Z',
          isPublicLink: false,
          isLocallyAvailable: true,
          id: 'personal/my-folder',
          fullKey: 'personal/my-folder',
          ipfsHash: 'QmTdw5ca9ztdmQ1ffnridhV28sfpXQBNWTwca6Zss7X1RC',
          isAvailableInSpace: false,
          sourceBucket: 'personal',
          shareAmount: 1,
          isUploading: false,
          sourcePath: '',
        },
      ],
    });
  }, 1000);
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
