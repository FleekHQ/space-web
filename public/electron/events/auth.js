const { ipcMain } = require('electron');
const { getAddressByPublicKey } = require('../utils');
const { apiClient, spaceClient } = require('../clients');

const EVENT_PREFIX = 'auth';
const SIGNIN_EVENT = `${EVENT_PREFIX}:signin`;
const SIGNIN_ERROR_EVENT = `${EVENT_PREFIX}:signin:error`;
const SIGNIN_SUCCESS_EVENT = `${EVENT_PREFIX}:signin:success`;
const SIGNUP_EVENT = `${EVENT_PREFIX}:signup`;
const SIGNUP_ERROR_EVENT = `${EVENT_PREFIX}:signup:error`;
const SIGNUP_SUCCESS_EVENT = `${EVENT_PREFIX}:signup:success`;
const CHECK_USERNAME_EVENT = `${EVENT_PREFIX}:check_username`;
const CHECK_USERNAME_ERROR_EVENT = `${EVENT_PREFIX}:check_username:error`;
const CHECK_USERNAME_SUCCESS_EVENT = `${EVENT_PREFIX}:check_username:success`;
const RESTORE_KEYS_MNEMONIC_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic`;
const RESTORE_KEYS_MNEMONIC_ERROR_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic:error`;
const RESTORE_KEYS_MNEMONIC_SUCCESS_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic:success`;

/* eslint-disable no-console */
const registerAuthEvents = (mainWindow) => {
  ipcMain.on(SIGNIN_EVENT, async (_, payload) => {
    try {
      let user;

      if (payload.username && payload.password && !payload.torusRes) {
        const { data } = await apiClient.identities.getByUsername({
          usernames: [payload.username],
        });
        await spaceClient.recoverKeysByPassphrase({
          uuid: data.data.uuid,
          passphrase: payload.password,
        });

        user = { ...data.data };
      } else {
        const { data } = await apiClient.identities.getByAddress({
          token: '',
          addresses: [payload.torusRes.publicAddress],
        });

        await spaceClient.recoverKeysByPassphrase({
          uuid: data.data.uuid,
          passphrase: payload.torusRes.privateKey,
        });

        user = { ...data.data };
      }

      mainWindow.webContents.send(SIGNIN_SUCCESS_EVENT, user);
    } catch (error) {
      console.error('SIGNIN_ERROR_EVENT', error);

      let message = error.message || '';

      if (
        (error.code && error.code === 2)
        || (error.response && error.response.data)
      ) {
        message = 'modules.signin.errors.invalid';
      }

      mainWindow.webContents.send(SIGNIN_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(SIGNUP_EVENT, async (_, payload) => {
    try {
      let user;

      await spaceClient.generateKeyPairWithForce();

      if (payload.username && payload.password) {
        const apiSessionRes = await spaceClient.getAPISessionTokens();

        const { data } = await apiClient.identity.update({
          username: payload.username,
          token: apiSessionRes.getServicestoken(),
        });
        await spaceClient.backupKeysByPassphrase({
          type: 0, // 0 = PASSWORD; 1 = ETH
          uuid: data.data.uuid,
          passphrase: payload.password,
        });

        user = { ...data.data };
      } else {
        const apiSessionRes = await spaceClient.getAPISessionTokens();

        const { data } = await apiClient.identity.update({
          token: apiSessionRes.getServicestoken(),
          displayName: payload.torusRes.userInfo.name,
        });

        await spaceClient.backupKeysByPassphrase({
          type: 1, // 0 = PASSWORD; 1 = ETH
          uuid: data.data.uuid,
          passphrase: payload.torusRes.privateKey,
        });

        await apiClient.identity.addEthAddress({
          token: apiSessionRes.getServicestoken(),
          address: payload.torusRes.publicAddress,
          provider: payload.torusRes.userInfo.typeOfLogin,
          metadata: {
            email: payload.torusRes.userInfo.email,
            name: payload.torusRes.userInfo.name,
          },
        });

        user = { ...data.data };
      }

      mainWindow.webContents.send(SIGNUP_SUCCESS_EVENT, user);
    } catch (error) {
      console.error('SIGNUP_ERROR_EVENT', error);

      let message = error.message || '';

      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          message = 'modules.signup.errors.identity';
        }

        if (error.response.status === 409) {
          message = 'modules.signup.errors.username';
        }
      }

      mainWindow.webContents.send(SIGNUP_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(CHECK_USERNAME_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.getIdentityByUsername(payload);
      mainWindow.webContents.send(CHECK_USERNAME_SUCCESS_EVENT, {
        identity: res.getIdentity(),
      });
    } catch (err) {
      console.error('CHECK_USERNAME_ERROR_EVENT', err);

      mainWindow.webContents.send(CHECK_USERNAME_ERROR_EVENT, err);
    }
  });

  ipcMain.on(RESTORE_KEYS_MNEMONIC_EVENT, async (event, payload) => {
    try {
      await spaceClient.restoreKeyPairViaMnemonic(payload);
      const publicKeyResponse = await spaceClient.getPublicKey();
      const sessionTokensResponse = await spaceClient.getAPISessionTokens();
      const address = getAddressByPublicKey(publicKeyResponse.getPublickey());
      const { data } = await apiClient.identities.getByAddress({
        addresses: [address],
        token: sessionTokensResponse.getServicestoken(),
      });
      mainWindow.webContents.send(RESTORE_KEYS_MNEMONIC_SUCCESS_EVENT, data.data);
    } catch (err) {
      console.error('RESTORE_KEYS_MNEMONIC_ERROR_EVENT', err);

      mainWindow.webContents.send(RESTORE_KEYS_MNEMONIC_ERROR_EVENT, err);
    }
  });
};

module.exports = registerAuthEvents;
