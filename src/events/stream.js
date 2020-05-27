import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'eventStream';
const DATA_EVENT = `${EVENT_PREFIX}:data`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

const registerEventStream = () => {
  ipcRenderer.on(DATA_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(DATA_EVENT, event, payload);
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_EVENT, event, payload);
  });
};

export default registerEventStream;
