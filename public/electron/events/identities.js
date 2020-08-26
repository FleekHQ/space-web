const { ipcMain } = require('electron');

const { apiClient, spaceClient } = require('../clients');

const EVENT_PREFIX = 'identities';
const GET_IDENTITIES_BY_ADDRESS_EVENT = `${EVENT_PREFIX}:byAddress`;
const GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT = `${EVENT_PREFIX}:byAddress:error`;
const GET_IDENTITIES_BY_ADDRESS_SUCCESS_EVENT = `${EVENT_PREFIX}:byAddress:success`;

const registerIdentitiesEvents = (mainWindow) => {
  ipcMain.on(GET_IDENTITIES_BY_ADDRESS_EVENT, async (_, payload) => {
    try {
      const res = await spaceClient.getAPISessionTokens();
      const { data } = await apiClient.identities.getByAddress({
        token: res.getServicestoken(),
        addresses: payload.addresses,
      });

      const identities = Array.isArray(data.data) ? data.data : [data.data];
      mainWindow.webContents.send(GET_IDENTITIES_BY_ADDRESS_SUCCESS_EVENT, { identities });
    } catch (error) {
      let message = error.message || '';

      if (error.response && error.response.data) {
        message = 'Error when trying to get identities by addres';
      }

      mainWindow.webContents.send(GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT, {
        message,
      });
    }
  });
};

module.exports = registerIdentitiesEvents;
