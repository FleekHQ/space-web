import { sdk, apiClient } from '@clients';

import { AUTH_ACTION_TYPES } from '../reducers/auth';
import { USER_ACTION_TYPES } from '../reducers/user';

const registerAuthEvents = () => {
};

export const signout = (user) => async (dispatch) => {
  try {
    const { users } = await sdk.get();
    if (!users) {
      return;
    }

    const userIdentity = users.list().find((u) => {
      const pubKey = Buffer.from(u.identity.public.pubKey).toString('hex');

      return pubKey === user.publicKey;
    });

    if (userIdentity) {
      await users.remove(userIdentity.identity.public.toString());
    }

    dispatch({
      type: USER_ACTION_TYPES.ON_USER_LOGOUT,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when trying remove identity: ${error.message}`);
  }
};

/**
 * User signin
 * @param {Object} payload
 * @param {Object=} payload.torusRes
 */
export const signin = (payload) => async (dispatch) => {
  dispatch({
    type: AUTH_ACTION_TYPES.ON_AUTHENTICATION,
  });

  try {
    const { users } = await sdk.get();
    const backupType = payload.torusRes.userInfo.typeOfLogin === 'passwordless' ? 'email' : payload.torusRes.userInfo.typeOfLogin;

    const { data } = await apiClient.identities.getByAddress({
      token: '',
      addresses: [payload.torusRes.publicAddress],
    });

    await users.recoverKeysByPassphrase(
      data.data.uuid,
      payload.torusRes.privateKey,
      backupType,
    );

    sdk.updateStorage();

    dispatch({
      type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_SUCCESS,
      user: {
        ...data.data,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('SIGNIN_ERROR_EVENT', error);

    let message = error.message || '';

    if (
      (error.code && error.code === 2)
      || (error.response && error.response.data)
    ) {
      message = 'modules.signin.errors.invalid';
    }

    dispatch({
      error: message,
      type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR,
    });
  }
};

/**
 * User signup
 * @param {Object} payload
 * @param {Object=} payload.torusRes
 */
export const signup = (payload) => async (dispatch) => {
  dispatch({
    type: AUTH_ACTION_TYPES.ON_AUTHENTICATION,
  });

  try {
    const { users } = await sdk.get();
    const identity = await users.createIdentity();
    const spaceUser = await users.authenticate(identity);
    const backupType = payload.torusRes.userInfo.typeOfLogin === 'passwordless' ? 'email' : payload.torusRes.userInfo.typeOfLogin;

    const { data } = await apiClient.identity.update({
      token: spaceUser.token,
      displayName: payload.torusRes.userInfo.name,
    });

    await users.backupKeysByPassphrase(
      data.data.uuid,
      payload.torusRes.privateKey,
      backupType,
      identity,
    );

    await apiClient.identity.addEthAddress({
      token: spaceUser.token,
      address: payload.torusRes.publicAddress,
      provider: payload.torusRes.userInfo.typeOfLogin,
      metadata: {
        name: payload.torusRes.userInfo.name,
        email: payload.torusRes.userInfo.email,
        nickname: payload.torusRes.userInfo.nickname,
      },
    });

    dispatch({
      type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_SUCCESS,
      user: {
        ...data.data,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('SIGNUP_ERROR_EVENT', error);

    let message = error.message || '';

    if (error.response && error.response.data) {
      if (error.response.status === 404) {
        message = 'modules.signup.errors.identity';
      }

      if (error.response.status === 409) {
        message = 'modules.signup.errors.username';
      }
    }

    dispatch({
      error: message,
      type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR,
    });
  }
};

export default registerAuthEvents;
