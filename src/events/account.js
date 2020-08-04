import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'account';
const DELETE_ACCOUNT_EVENT = `${EVENT_PREFIX}:delete`;
const DELETE_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:delete:error`;
const DELETE_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:delete:success`;

const registerAccountEvents = () => {
  ipcRenderer.on(DELETE_ACCOUNT_ERROR_EVENT, () => {
    // TODO: do something.
  });

  ipcRenderer.on(DELETE_ACCOUNT_SUCCESS_EVENT, () => {
    // TODO: do something.
  });
};

export const deleteAccount = () => {
  ipcRenderer.send(DELETE_ACCOUNT_EVENT);
};

export default registerAccountEvents;
