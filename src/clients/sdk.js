import { Users, BrowserStorage, UserStorage } from '@spacehq/sdk';
import config from '@config';

const EVENTS = {
  ready: 'ready',
};

function Sdk() {
  this.isStarting = true;

  const cbs = {};
  /** @type {Users} */
  let users = null;

  const init = async () => {
    users = await Users.withStorage(new BrowserStorage(), {
      endpoint: config.ws.url,
      vaultServiceConfig: {
        serviceUrl: config.vault.serviceUrl,
        saltSecret: config.vault.saltSecret,
      },
    }, (error, identity) => {
      // eslint-disable-next-line no-console
      console.log('error', error);
      // eslint-disable-next-line no-console
      console.log('identity', identity);
    });

    this.isStarting = false;

    if (cbs[EVENTS.ready] && cbs[EVENTS.ready].length > 0) {
      cbs[EVENTS.ready].forEach((cb) => {
        cb.call(null);
      });
    }
  };

  /**
   * @returns {Users}
   */
  this.getUsers = async () => {
    if (!users) {
      await init();
    }

    return users;
  };

  /**
   * @returns {UserStorage?}
   */
  this.getStorage = async () => {
    if (!users) {
      await init();
    }

    const usersList = users.list();
    if (usersList.length > 0) {
      return new UserStorage(usersList[0], {
        textileHubAddress: config.textileHubAddress,
      });
    }

    return null;
  };

  this.onListen = function onListen(event, cb) {
    if (typeof cbs[event] === 'undefined') {
      cbs[event] = [];
    }

    cbs[event].push(cb);

    return () => {
      cbs[event] = cbs[event].filter((_cb) => _cb !== cb);
    };
  };

  init();
}

const sdk = new Sdk();

export default sdk;
