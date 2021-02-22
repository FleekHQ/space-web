// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import { sdk } from '@clients';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';
import store from '../store';

const registerNotificationSubscribe = async () => {
  const storage = await sdk.getStorage();
  await storage.initListener();

  const response = await storage.NotificationSubscribe();

  const handler = (data) => {
    console.log('data...', data);
  };

  response.on('data', handler);

  return (() => {
    response.off('data', handler);
  });
};

export default registerNotificationSubscribe;

// import { sdk } from '@clients';
// import { listDirectory } from './objects';

// const registerTxlSubscribeEvents = async () => {
//   const storage = await sdk.getStorage();
//   await storage.initListener();

//   const response = await storage.txlSubscribe();
//   const handler = async ({ bucketName }) => {
//     if (bucketName === 'personal') {
//       await listDirectory('', bucketName);
//     }
//   };

//   response.on('data', handler);

//   return () => {
//     response.off('data', handler);
//   };
// };

// export default registerTxlSubscribeEvents;
