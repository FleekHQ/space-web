import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'txlSuscribe';
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

/* eslint-disable no-console */
const registerTxlSubscribeEvents = () => {
  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_EVENT, event, payload);
  });
};

export default registerTxlSubscribeEvents;
