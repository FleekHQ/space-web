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
const TEST_KEYS_BY_PASSPHRASE_EVENT = `${EVENT_PREFIX}:testKeys`;
const TEST_KEYS_BY_PASSPHRASE_ERROR_EVENT = `${EVENT_PREFIX}:testKeys:error`;
const TEST_KEYS_BY_PASSPHRASE_SUCCESS_EVENT = `${EVENT_PREFIX}:testKeys:success`;

const registerKeysEvents = (mainWindow) => {
  ipcMain.on(GET_PUBLIC_KEY_EVENT, async () => {
    try {
      const res = await spaceClient.getPublicKey();

      mainWindow.webContents.send(GET_PUBLIC_KEY_SUCCESS_EVENT, {
        publicKey: res.getPublickey(),
      });
    } catch (err) {
      mainWindow.webContents.send(GET_PUBLIC_KEY_ERROR_EVENT, err);
    }
  });

  ipcMain.on(DELETE_KEY_PAIR, async () => {
    try {
      await spaceClient.deleteKeyPair();

      mainWindow.webContents.send(DELETE_KEY_PAIR_SUCCESS);
    } catch (err) {
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
      mainWindow.webContents.send(GET_MNEMONIC_SEED_ERROR_EVENT, err);
    }
  });

  ipcMain.on(BACKUP_KEYS_BY_PASSPHRASE_SEED_EVENT, async (_, payload) => {
    try {
      await spaceClient.backupKeysByPassphrase(payload);

      mainWindow.webContents.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_SUCCESS_EVENT);
    } catch (err) {
      mainWindow.webContents.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT, err);
    }
  });

  ipcMain.on(TEST_KEYS_BY_PASSPHRASE_EVENT, async (_, payload) => {
    try {
      await spaceClient.testKeysPassphrase(payload);
      await spaceClient.deleteKeyPair();

      mainWindow.webContents.send(TEST_KEYS_BY_PASSPHRASE_SUCCESS_EVENT);
    } catch (error) {
      mainWindow.webContents.send(TEST_KEYS_BY_PASSPHRASE_ERROR_EVENT, {
        message: error.message,
      });
    }
  });
};

module.exports = registerKeysEvents;
