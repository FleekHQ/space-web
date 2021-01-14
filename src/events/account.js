/* eslint-disable no-console */
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

  const users = await sdk.getUsers();

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

  const users = await sdk.getUsers();

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
export const createUsernameAndPassword = () => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME,
  });
};

export const getLinkedAddresses = () => async (dispatch) => {
  try {
    const users = await sdk.getUsers();

    const { token } = users.list()[0];
    const { data } = await apiClient.identity.getLinkedAddresses({
      token,
    });

    dispatch({
      addresses: data.data,
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_SUCCESS,
    });
  } catch (error) {
    console.error('GET_LINKED_ADDRESSES_ERROR_EVENT', error);

    dispatch({
      error,
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_ERROR,
    });
  }
};

/**
 * @param {Object} payload
 * @param {string} payload.torusPrivateKey
 * @param {string} payload.torusPublicAddress
 * @param {string} payload.provider
 * @param {string} payload.uuid
 */
export const addLinkedAddress = (payload) => async (dispatch) => {
  try {
    const users = await sdk.getUsers();
    const backupType = payload.torusRes.userInfo.typeOfLogin === 'passwordless' ? 'email' : payload.torusRes.userInfo.typeOfLogin;

    const spaceUser = users.list()[0];
    await users.backupKeysByPassphrase(
      payload.uuid,
      payload.torusRes.privateKey,
      backupType,
      spaceUser.identity,
    );

    await apiClient.identity.addEthAddress({
      token: spaceUser.token,
      address: payload.torusRes.publicAddress,
      provider: payload.provider,
      metadata: {
        name: payload.torusRes.userInfo.name,
        email: payload.torusRes.userInfo.email,
        nickname: payload.torusRes.userInfo.nickname,
      },
    });

    dispatch({
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_SUCCESS,
      payload: {
        uuid: payload.uuid,
        address: payload.torusRes.publicAddress,
        provider: payload.provider,
        createdAt: new Date().toISOString(),
        metadata: {
          name: payload.torusRes.userInfo.name,
          email: payload.torusRes.userInfo.email,
          nickname: payload.torusRes.userInfo.nickname,
        },
      },
    });
  } catch (error) {
    console.error('ADD_LINKED_ADDRESS_ERROR_EVENT', error);
    let message = error.message || '';

    if (error.response && error.response.data) {
      if (error.response.status === 409) {
        message = error.response.data.error;
      }
    }

    dispatch({
      error: message,
      type: LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_ERROR,
    });
  }
};

export default registerAccountEvents;
