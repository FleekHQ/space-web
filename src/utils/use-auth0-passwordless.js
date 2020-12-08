import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import config from '@config';

export default function useAuth0Passwordless() {
  const location = useLocation();
  const [state, setState] = React.useState({
    success: null,
    loading: false,
  });

  /**
   * @param {Object} opts
   * @param {string} opts.from
   * @param {string} opts.email
   */
  const sendPasswordlessEmail = async ({ email, from }) => {
    if (email.length === 0) {
      return false;
    }

    setState({
      ...state,
      loading: true,
    });

    try {
      await axios.post(`${config.torus.providers.passwordless.jwtParams.domain}/passwordless/start`, {
        email,
        send: 'link',
        connection: 'email',
        client_id: config.torus.providers.passwordless.clientId,
        authParams: {
          scope: 'openid profile email',
          response_type: 'token id_token',
          redirect_uri: `space://auth/${from}`,
          nonce: new Date().getMilliseconds().toString(),
          prompt: 'login',
          state: encodeURIComponent(
            window.btoa(
              JSON.stringify({
                email,
                redirectToOpener: false,
                verifier: config.torus.providers.passwordless.verifier,
              }),
            ),
          ),
        },
      });

      setState({
        ...state,
        loading: false,
      });

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error when trying to start passwordless flow: ${error.message}`);

      setState({
        ...state,
        loading: false,
      });

      return false;
    }
  };

  return {
    sendPasswordlessEmail,
    loading: state.loading,
    getLoginPayload: () => {
      let hash = '';
      let stateFields = {};

      try {
        hash = location.hash.substr(1);
        const hashParams = hash.split('&').reduce((params, item) => {
          const [key, value] = item.split('=');

          return {
            ...params,
            [key]: value,
          };
        }, {});

        stateFields = JSON.parse(window.atob(decodeURIComponent(hashParams.state)));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error when trying to get torus passwordless login payload: ${error.message}`);
      }

      return {
        hash,
        stateFields,
      };
    },
  };
}
