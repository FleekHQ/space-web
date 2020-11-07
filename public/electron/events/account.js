const fs = require('fs');
const get = require('lodash/get');
const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'account';
const DELETE_ACCOUNT_EVENT = `${EVENT_PREFIX}:delete`;
const DELETE_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:delete:error`;
const DELETE_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:delete:success`;
const UPDATE_IDENTITY_EVENT = `${EVENT_PREFIX}:identity:update`;
const UPDATE_IDENTITY_ERROR_EVENT = `${UPDATE_IDENTITY_EVENT}:error`;
const UPDATE_IDENTITY_SUCCESS_EVENT = `${UPDATE_IDENTITY_EVENT}:success`;
const UPLOAD_PROFILE_PIC_EVENT = `${EVENT_PREFIX}:identity:uploadProfilePic`;
const UPLOAD_PROFILE_PIC_ERROR_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:error`;
const UPLOAD_PROFILE_PIC_SUCCESS_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:success`;
const CREATE_USERNAME_AND_PASSWORD_EVENT = `${EVENT_PREFIX}:createUsernameAndPassword`;
const CREATE_USERNAME_AND_PASSWORD_ERROR_EVENT = `${EVENT_PREFIX}:createUsernameAndPassword:error`;
const CREATE_USERNAME_AND_PASSWORD_SUCCESS_EVENT = `${EVENT_PREFIX}:createUsernameAndPassword:success`;
const GET_LINKED_ADDRESSES_EVENT = `${EVENT_PREFIX}:getLinkedAddresses`;
const GET_LINKED_ADDRESSES_SUCCESS_EVENT = `${EVENT_PREFIX}:getLinkedAddresses:success`;
const GET_LINKED_ADDRESSES_ERROR_EVENT = `${EVENT_PREFIX}:getLinkedAddresses:error`;
const ADD_LINKED_ADDRESS_EVENT = `${EVENT_PREFIX}:add_linked_address`;
const ADD_LINKED_ADDRESS_SUCCESS_EVENT = `${EVENT_PREFIX}:add_linked_address:success`;
const ADD_LINKED_ADDRESS_ERROR_EVENT = `${EVENT_PREFIX}:add_linked_address:error`;

/* eslint-disable no-console */
const registerAuthEvents = (mainWindow) => {
  ipcMain.on(CREATE_USERNAME_AND_PASSWORD_EVENT, async (_, payload) => {
    try {
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

      mainWindow.webContents.send(CREATE_USERNAME_AND_PASSWORD_SUCCESS_EVENT, data.data);
    } catch (err) {
      console.error('CREATE_USERNAME_AND_PASSWORD_ERROR_EVENT', err);
      mainWindow.webContents.send(CREATE_USERNAME_AND_PASSWORD_ERROR_EVENT, err);
    }
  });

  ipcMain.on(DELETE_ACCOUNT_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();
      await spaceClient.deleteAccount();
      await apiClient.identity.deleteAccount({
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(DELETE_ACCOUNT_SUCCESS_EVENT, {});
    } catch (err) {
      console.error('DELETE_ACCOUNT_ERROR_EVENT', err);
      mainWindow.webContents.send(DELETE_ACCOUNT_ERROR_EVENT, err);
    }
  });

  ipcMain.on(UPDATE_IDENTITY_EVENT, async (event, payload) => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const { data } = await apiClient.identity.update({
        ...payload,
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(UPDATE_IDENTITY_SUCCESS_EVENT, data);
    } catch (error) {
      console.error('UPDATE_IDENTITY_ERROR_EVENT', error);
      let message = error.message || error.toString();

      const statusCode = get(error, 'response.status');

      if (statusCode === 409) {
        message = error.response.data.error;
      }

      mainWindow.webContents.send(UPDATE_IDENTITY_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(UPLOAD_PROFILE_PIC_EVENT, async (event, payload) => {
    const { imagePath } = payload;
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const base64Image = fs.readFileSync(imagePath).toString('base64');

      const { data } = await apiClient.identity.uploadProfilePic({
        base64Image,
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(UPLOAD_PROFILE_PIC_SUCCESS_EVENT, data);
    } catch (error) {
      console.error('UPLOAD_PROFILE_PIC_ERROR_EVENT', error);

      let message = error.message || error.toString();

      const statusCode = get(error, 'response.status');

      if (statusCode === 409) {
        message = error.response.data.error;
      }

      mainWindow.webContents.send(UPLOAD_PROFILE_PIC_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(GET_LINKED_ADDRESSES_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();
      const { data } = await apiClient.identity.getLinkedAddresses({
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(GET_LINKED_ADDRESSES_SUCCESS_EVENT, data);
    } catch (error) {
      console.error('GET_LINKED_ADDRESSES_ERROR_EVENT', error);

      mainWindow.webContents.send(GET_LINKED_ADDRESSES_ERROR_EVENT, error);
    }
  });

  ipcMain.on(ADD_LINKED_ADDRESS_EVENT, async (_, payload) => {
    try {
      await spaceClient.backupKeysByPassphrase({
        uuid: payload.uuid,
        passphrase: payload.torusRes.privateKey,
      });
      const apiSessionRes = await spaceClient.getAPISessionTokens();
      console.log({
        token: apiSessionRes.getServicestoken(),
        address: payload.torusRes.publicAddress,
        provider: payload.provider,
        metadata: {
          email: payload.torusRes.userInfo.email,
          name: payload.torusRes.userInfo.name,
        },
      });
      await apiClient.identity.addEthAddress({
        token: apiSessionRes.getServicestoken(),
        address: payload.torusRes.publicAddress,
        provider: payload.provider,
        metadata: {
          email: payload.torusRes.userInfo.email,
          name: payload.torusRes.userInfo.name,
        },
      });
      mainWindow.webContents.send(ADD_LINKED_ADDRESS_SUCCESS_EVENT, {
        uuid: payload.uuid,
        address: payload.torusRes.publicAddress,
        provider: payload.provider,
        createdAt: new Date().toISOString(),
        metadata: {
          email: payload.torusRes.userInfo.email,
          name: payload.torusRes.userInfo.name,
        },
      });
    } catch (error) {
      console.error('ADD_LINKED_ADDRESS_ERROR_EVENT', error);

      mainWindow.webContents.send(ADD_LINKED_ADDRESS_ERROR_EVENT, {
        message: error.message,
      });
    }
  });
};

module.exports = registerAuthEvents;
