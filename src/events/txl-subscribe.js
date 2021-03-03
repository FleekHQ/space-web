import { sdk } from '@clients';
import * as Sentry from '@sentry/react';

import { listDirectory } from './objects';

const registerTxlSubscribeEvents = async () => {
  const storage = await sdk.getStorage();
  await storage.initListener();

  const response = await storage.txlSubscribe();
  const handler = async ({ bucketName }) => {
    if (bucketName === 'personal') {
      await listDirectory('', bucketName);
    }
  };

  response.on('data', handler);

  response.on('error', (data) => {
    Sentry.captureException(data.error);
  });

  return () => {
    response.off('data', handler);
  };
};

export default registerTxlSubscribeEvents;
