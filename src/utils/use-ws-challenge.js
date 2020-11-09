import EthCrypto from 'eth-crypto';

import config from '@config';

const MS_TIMEOUT = 15000;

export default function useWsChallenge() {
  /**
   * WS connection to verify if an identity exists with current privateKey
   * @param {import('./use-torus-sdk').TorusRes} torusRes
   * @returns {Promise<{ identityExists: Boolean }>}
   */
  const checkIdentityByEthKey = (torusRes) => {
    let timer;

    return new Promise((resolve, reject) => {
      if (!torusRes) {
        reject(new Error('noData'));
        return;
      }
      const ws = new WebSocket(config.ws.url);
      const publicKey = EthCrypto.publicKeyByPrivateKey(torusRes.privateKey);

      timer = setTimeout(() => {
        reject(new Error('timeout'));
      }, MS_TIMEOUT);

      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            action: 'ethToken',
            data: {
              pubkey: publicKey,
            },
          }),
        );
      });

      ws.addEventListener('message', async (event) => {
        try {
          const obj = JSON.parse(event.data);

          if (obj.type === 'challenge') {
            const sig = await EthCrypto
              .decryptWithPrivateKey(torusRes.privateKey, obj.value);

            ws.send(
              JSON.stringify({
                action: 'challenge',
                data: {
                  sig,
                  pubkey: publicKey,
                },
              }),
            );
          } else if (obj.type === 'ethToken') {
            if (obj.value && obj.value.address) {
              clearTimeout(timer);
              resolve({
                identityExists: true,
              });
              return;
            }

            // eslint-disable-next-line no-console
            console.error('Bad message from WS: ', obj);
            clearTimeout(timer);
            reject(new Error('badMessage'));
          } else {
            if (obj.value && obj.value.message && obj.value.message.includes('not found')) {
              clearTimeout(timer);
              resolve({
                identityExists: false,
              });
              return;
            }

            // eslint-disable-next-line no-console
            console.error('Unexpected response: ', obj);
            clearTimeout(timer);
            reject(new Error('unexpected'));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Unexpected response: ${error.message}`);
          clearTimeout(timer);
          reject(new Error('unexpected'));
        }
      });
    });
  };

  return {
    checkIdentityByEthKey,
  };
}
