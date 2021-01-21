import { sdk } from '@clients';
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

  return () => {
    response.off('data', handler);
  };
};

export default registerTxlSubscribeEvents;
