import { sdk } from '@clients';
import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';

import { listDirectory } from './objects';

const EVENT_NAME = 'txl-subscribe';

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
    const errorInfo = {
      tags: { event: EVENT_NAME, method: 'registerTxlSubscribeEvents' },
    };

    Sentry.captureException(data.error, errorInfo);
    LogRocket.captureException(data.error, errorInfo);
  });

  return () => {
    response.off('data', handler);
  };
};

export default registerTxlSubscribeEvents;
