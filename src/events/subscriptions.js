import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'subscriptions';
const SUBSCRIBE_EVENT = `${EVENT_PREFIX}:subscribe`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:subscribe:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:subscribe:success`;

/* eslint-disable no-console */
const registerSubscriptions = () => {
  ipcRenderer.on(SUBSCRIBE_ERROR_EVENT, (_, error) => {
    console.error('Failed to subscribe to steams', error);
  });

  ipcRenderer.on(SUBSCRIBE_SUCCESS_EVENT, () => {
  });
};

export const subscribeToStreams = () => {
  ipcRenderer.send(SUBSCRIBE_EVENT);
};

export default registerSubscriptions;
