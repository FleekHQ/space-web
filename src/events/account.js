// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars, no-console */
import { sdk, apiClient } from '@clients';

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

export const uploadProfilePic = async (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATE_AVATAR,
  });

  const { users } = await sdk;

  try {
    const { token } = users.list()[0];
    const base64Image = payload.file.split(',').pop();

    const { data } = await apiClient.identity.uploadProfilePic({ token, base64Image });

    store.dispatch({
      user: data.data,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_SUCCESS,
    });
  } catch (error) {
    console.error(error);

    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR,
    });
  }
};

export const updateIdentity = async (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATING_USER,
  });

  const { users } = await sdk;

  try {
    const { token } = users.list()[0];
    const { data } = await apiClient.identity.update({ token, ...payload });

    store.dispatch({
      user: data.data,
      type: USER_ACTION_TYPES.UPDATE_USER,
    });
  } catch (error) {
    console.error(error);

    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_UPDATING_USER_ERROR,
    });
  }
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
