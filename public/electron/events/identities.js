const { ipcMain } = require('electron');

const { apiClient, spaceClient } = require('../clients');

const EVENT_PREFIX = 'identities';
const GET_IDENTITIES_BY_ADDRESS_EVENT = `${EVENT_PREFIX}:byAddress`;
const GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT = `${EVENT_PREFIX}:byAddress:error`;
const GET_IDENTITIES_BY_ADDRESS_SUCCESS_EVENT = `${EVENT_PREFIX}:byAddress:success`;
const GET_RECENTLY_MEMBERS_EVENT = `${EVENT_PREFIX}:recentlyMembers`;
const GET_RECENTLY_MEMBERS_ERROR_EVENT = `${EVENT_PREFIX}:recentlyMembers:error`;
const GET_RECENTLY_MEMBERS_SUCCESS_EVENT = `${EVENT_PREFIX}:recentlyMembers:success`;

/* eslint-disable no-console */
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
      console.error('GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT', error);

      let message = error.message || '';

      if (error.response && error.response.data) {
        message = 'Error when trying to get identities by addres';
      }

      mainWindow.webContents.send(GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(GET_RECENTLY_MEMBERS_EVENT, async () => {
    try {
      const res = await spaceClient.getRecentlySharedWith();
      const membersAddresses = res
        .getMembersList()
        .map((member) => member.getAddress());

      if (membersAddresses.length < 1) return;

      const apiTokens = await spaceClient.getAPISessionTokens();

      const { data } = await apiClient.identities.getByAddress({
        token: apiTokens.getServicestoken(),
        addresses: membersAddresses,
      });

      const identities = Array.isArray(data.data) ? data.data : [data.data];

      mainWindow.webContents.send(GET_RECENTLY_MEMBERS_SUCCESS_EVENT, { identities });
    } catch (error) {
      console.error('GET_RECENTLY_MEMBERS_ERROR_EVENT', error);

      mainWindow.webContents.send(GET_RECENTLY_MEMBERS_ERROR_EVENT, error);
    }
  });
};

module.exports = registerIdentitiesEvents;
