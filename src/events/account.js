/* eslint-disable no-unused-vars */
import store from '../store';
import { USER_ACTION_TYPES } from '../reducers/user';
import { DELETE_ACCOUNT_ACTION_TYPES } from '../reducers/delete-account';
import { LINKED_ADDRESSES_ACTION_TYPES } from '../reducers/linked-addresses';

const registerAccountEvents = () => {
};

export const deleteAccount = () => {
  store.dispatch({
    type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT,
  });
};

export const uploadProfilePic = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATE_AVATAR,
  });
};

export const updateIdentity = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATING_USER,
  });
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
};

export const getLinkedAddresses = () => {
  store.dispatch({
    type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES,
  });
};

/**
 * @param {Object} payload
 * @param {string} payload.torusPrivateKey
 * @param {string} payload.torusPublicAddress
 * @param {string} payload.provider
 * @param {string} payload.uuid
 */
export const addLinkedAddress = (payload) => {
};

export default registerAccountEvents;
