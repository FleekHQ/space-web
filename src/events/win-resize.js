import { ipcRenderer } from 'electron';

// eslint-disable-next-line import/prefer-default-export
export const resizeWindow = (payload) => {
  ipcRenderer.send('winResize', payload);
};
