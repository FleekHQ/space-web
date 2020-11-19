import get from 'lodash/get';
import { ipcRenderer } from 'electron';

import store from '../store';
import { USER_ACTION_TYPES } from '../reducers/user';
import { DELETE_ACCOUNT_ACTION_TYPES } from '../reducers/delete-account';
import { LINKED_ADDRESSES_ACTION_TYPES } from '../reducers/linked-addresses';

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

const registerAccountEvents = () => {
  ipcRenderer.on(CREATE_USERNAME_AND_PASSWORD_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to create username and password', error.message);

    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_ERROR,
    });
  });

  ipcRenderer.on(CREATE_USERNAME_AND_PASSWORD_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      user: data,
      type: USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS,
    });
  });

  ipcRenderer.on(DELETE_ACCOUNT_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to delete the account', error.message);

    store.dispatch({
      error: error.message,
      type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_ERROR,
    });
  });

  ipcRenderer.on(DELETE_ACCOUNT_SUCCESS_EVENT, () => {
    store.dispatch({
      type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_SUCCESS,
    });
  });

  /* eslint-disable no-console */
  ipcRenderer.on(UPDATE_IDENTITY_ERROR_EVENT, (event, error) => {
    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_UPDATING_USER_ERROR,
    });
  });

  ipcRenderer.on(UPDATE_IDENTITY_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: USER_ACTION_TYPES.UPDATE_USER,
    });
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_ERROR_EVENT, (event, error) => {
    console.error('Error when updating avatar', error);

    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR,
    });
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_SUCCESS,
    });
  });

  ipcRenderer.on(GET_LINKED_ADDRESSES_SUCCESS_EVENT, (event, payload) => {
    const data = get(payload, 'data', []) || [];

    store.dispatch({
      addresses: data,
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_SUCCESS,
    });
  });

  ipcRenderer.on(GET_LINKED_ADDRESSES_ERROR_EVENT, (event, error) => {
    store.dispatch({
      error,
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_ERROR,
    });
  });

  ipcRenderer.on(ADD_LINKED_ADDRESS_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_SUCCESS,
      payload,
    });
  });

  ipcRenderer.on(ADD_LINKED_ADDRESS_ERROR_EVENT, (event, { message }) => {
    store.dispatch({
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_ERROR,
      error: message,
    });
  });
};

export const deleteAccount = () => {
  store.dispatch({
    type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT,
  });

  ipcRenderer.send(DELETE_ACCOUNT_EVENT);
};

export const uploadProfilePic = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATE_AVATAR,
  });

  ipcRenderer.send(UPLOAD_PROFILE_PIC_EVENT, payload);
};

export const updateIdentity = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATING_USER,
  });

  ipcRenderer.send(UPDATE_IDENTITY_EVENT, payload);
};

/**
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 */
export const createUsernameAndPassword = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME,
  });

  ipcRenderer.send(CREATE_USERNAME_AND_PASSWORD_EVENT, payload);
};

export const getLinkedAddresses = () => {
  store.dispatch({
    type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES,
  });

  ipcRenderer.send(GET_LINKED_ADDRESSES_EVENT);
};

/**
 * @param {Object} payload
 * @param {string} payload.torusPrivateKey
 * @param {string} payload.torusPublicAddress
 * @param {string} payload.provider
 * @param {string} payload.uuid
 */
export const addLinkedAddress = (payload) => {
  ipcRenderer.send(ADD_LINKED_ADDRESS_EVENT, payload);
};

export default registerAccountEvents;
