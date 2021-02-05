import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import config from '@config';
import { apiClient } from '@clients';

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
  const sendPasswordlessEmail = async ({
    email,
    from,
    redirectTo,
  }) => {
    if (email.length === 0) {
      return {
        isSent: false,
      };
    }

    setState({
      ...state,
      loading: true,
    });

    try {
      const { data } = await apiClient.identities.getByEmail({
        emails: [email],
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          return {
            data: null,
          };
        }

        throw error;
      });

      if (
        (from === 'signup' && data)
        || (from === 'signin' && !data)
      ) {
        setState({
          ...state,
          loading: false,
        });

        return {
          error: true,
          isSent: false,
        };
      }

      await axios.post(`${config.torus.providers.passwordless.jwtParams.domain}/passwordless/start`, {
        email,
        send: 'link',
        connection: 'email',
        client_id: config.torus.providers.passwordless.clientId,
        authParams: {
          scope: 'openid profile email',
          response_type: 'token id_token',
          redirect_uri: `${process.env.REACT_APP_AUTH0_PASSWORDLESS_REDIRECT_URI}/${from}`,
          nonce: new Date().getMilliseconds().toString(),
          prompt: 'login',
          state: encodeURIComponent(
            window.btoa(
              JSON.stringify({
                email,
                redirectToOpener: false,
                verifier: config.torus.providers.passwordless.verifier,
                redirectTo,
              }),
            ),
          ),
        },
      });

      setState({
        ...state,
        loading: false,
      });

      return {
        isSent: true,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error when trying to start passwordless flow: ${error.message}`);

      setState({
        ...state,
        loading: false,
      });

      return {
        isSent: false,
      };
    }
  };

  return {
    sendPasswordlessEmail,
    loading: state.loading,
    getLoginPayload: () => {
      let hash = '';
      let stateFields = {};

      try {
        hash = location.hash.split('#');
        const hashParams = hash[hash.length - 1].split('&').reduce((params, item) => {
          const [key, value] = item.split('=');

          return {
            ...params,
            [key]: value,
          };
        }, {});

        stateFields = JSON.parse(
          window.atob(decodeURIComponent(decodeURIComponent(hashParams.state))),
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error when trying to get torus passwordless login payload: ${error.message}`);
      }

      return {
        stateFields,
        hash: hash[hash.length - 1],
      };
    },
  };
}
