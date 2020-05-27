import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'pathInfo';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerPathInfoEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(SUCCESS_EVENT, event, payload);
    alert(JSON.stringify(payload));
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_EVENT, event, payload);
  });
};

export const fetchPathInfo = (payload) => ipcRenderer.send(FETCH_EVENT, payload);

export default registerPathInfoEvents;
