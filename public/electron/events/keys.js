const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;
const DELETE_KEY_PAIR = `${EVENT_PREFIX}:delete`;
const DELETE_KEY_PAIR_SUCCESS = `${EVENT_PREFIX}:delete:success`;
const DELETE_KEY_PAIR_ERROR = `${EVENT_PREFIX}:delete:error`;
const GET_MNEMONIC_SEED_EVENT = `${EVENT_PREFIX}:get_mnemomnic`;
const GET_MNEMONIC_SEED_ERROR_EVENT = `${EVENT_PREFIX}:get_mnemomnic:error`;
const GET_MNEMONIC_SEED_SUCCESS_EVENT = `${EVENT_PREFIX}:get_mnemomnic:success`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_EVENT = `${EVENT_PREFIX}:backupByPassphrase`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT = `${EVENT_PREFIX}:backupByPassphrase:error`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_SUCCESS_EVENT = `${EVENT_PREFIX}:backupByPassphrase:success`;
const TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_EVENT = `${EVENT_PREFIX}:testKeysAndSignOut`;
const TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_ERROR_EVENT = `${EVENT_PREFIX}:testKeysAndSignOut:error`;
const TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_SUCCESS_EVENT = `${EVENT_PREFIX}:testKeysAndSignOut:success`;

/* eslint-disable no-console */
const registerKeysEvents = (mainWindow) => {
  ipcMain.on(GET_PUBLIC_KEY_EVENT, async () => {
    try {
      const res = await spaceClient.getPublicKey();

      mainWindow.webContents.send(GET_PUBLIC_KEY_SUCCESS_EVENT, {
        publicKey: res.getPublickey(),
      });
    } catch (err) {
      console.error('GET_PUBLIC_KEY_ERROR_EVENT', err);
      mainWindow.webContents.send(GET_PUBLIC_KEY_ERROR_EVENT, err);
    }
  });

  ipcMain.on(DELETE_KEY_PAIR, async () => {
    try {
      await spaceClient.deleteKeyPair();

      mainWindow.webContents.send(DELETE_KEY_PAIR_SUCCESS);
    } catch (err) {
      console.error('DELETE_KEY_PAIR_ERROR', err);
      mainWindow.webContents.send(DELETE_KEY_PAIR_ERROR, err);
    }
  });

  ipcMain.on(GET_MNEMONIC_SEED_EVENT, async () => {
    try {
      const res = await spaceClient.getStoredMnemonic();

      mainWindow.webContents.send(GET_MNEMONIC_SEED_SUCCESS_EVENT, {
        mnemonic: res.getMnemonic(),
      });
    } catch (err) {
      console.error('GET_MNEMONIC_SEED_ERROR_EVENT', err);
      mainWindow.webContents.send(GET_MNEMONIC_SEED_ERROR_EVENT, err);
    }
  });

  ipcMain.on(BACKUP_KEYS_BY_PASSPHRASE_SEED_EVENT, async (_, payload) => {
    const {
      uuid,
      passphrase,
      currentPassphrase,
    } = payload;

    if (currentPassphrase) {
      try {
        await spaceClient.testKeysPassphrase({
          uuid,
          passphrase: currentPassphrase,
        });
      } catch (err) {
        console.error('BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT:testKeysPassphrase', err);
        mainWindow.webContents.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT, 'testKeysError');
        return;
      }
    }

    try {
      await spaceClient.backupKeysByPassphrase({
        type: 0, // 0 = PASSWORD; 1 = ETH
        uuid,
        passphrase,
      });

      mainWindow.webContents.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_SUCCESS_EVENT);
    } catch (err) {
      console.error('BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT:backupKeysByPassphrase', err);
      mainWindow.webContents.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT, 'backupKeysError');
    }
  });

  ipcMain.on(TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_EVENT, async (_, payload) => {
    try {
      if (payload.passphrase) {
        await spaceClient.testKeysPassphrase(payload);
      }
      await spaceClient.deleteKeyPair();

      mainWindow.webContents.send(TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_SUCCESS_EVENT);
    } catch (error) {
      console.error('TEST_KEYS_BY_PASSPHRASE_ERROR_EVENT', error);
      mainWindow.webContents.send(TEST_KEYS_BY_PASSPHRASE_AND_SIGN_OUT_ERROR_EVENT, {
        message: error.message,
      });
    }
  });
};

module.exports = registerKeysEvents;
