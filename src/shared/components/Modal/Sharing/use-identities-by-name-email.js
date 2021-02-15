/* eslint-disable max-len */
import React from 'react';

import { checkIsEmail } from '@utils';
import { apiClient } from '@clients';

/**
 * @typedef {Object} Identity
 * @property {string=} publicKey
 * @property {string} id
 * @property {string} imageSrc
 * @property {string} username
 * @property {string} mainText
 * @property {string} secondaryText
 */
/**
 * @typedef {Object} UseIdentitiesByNameOrEmailState
 * @property {string=} error
 * @property {boolean=} loading
 * @property {Array.<Identity>} selectedIdentities
 */
/**
 * @typedef {Function} SetIdentitiesByNameOrEmailState
 */

/**
 * Use identities by name or email hook
 */
export default function useIdentitiesByNameOrEmail() {
  /**
   * @type {[UseIdentitiesByNameOrEmailState, SetIdentitiesByNameOrEmailState]} useIdentitiesByNameOrEmail
   */
  const [state, setState] = React.useState(
    /** @type {UseIdentitiesByNameOrEmailState} */
    ({
      error: null,
      loading: true,
      identities: [],
      selectedIdentities: [],
    }),
  );

  return {
    loading: state.loading,
    identities: state.identities,
    selectedIdentities: state.selectedIdentities,
    searchIdentityTerm: state.searchIdentityTerm,
    /**
     * Remove specific identity from `selectedIdentity` list
     * @param {Identity} identity
     * @returns {void}
     */
    onRemoveSelectedIdentity: (identity) => {
      setState((prevState) => ({
        ...prevState,
        selectedIdentities: prevState.selectedIdentities.filter((i) => i.id !== identity.id),
      }));
    },
    /**
     * Select specific identity to be added to `selectedIdentity` list
     * @param {Identity} identity
     * @returns {void}
     */
    onSelectIdentity: (identity) => {
      setState((prevState) => ({
        ...prevState,
        identities: [],
        selectedIdentities: [...prevState.selectedIdentities, identity],
      }));
    },
    /**
     * Search identity by term, could be displayName or email
     * @param {string} searchTerm
     * @returns {void}
     */
    onChangeSearchIdentityTerm: async (searchTerm) => {
      setState({
        ...state,
        loading: true,
      });
      try {
        let type = 'displayName';
        const isEmail = checkIsEmail(searchTerm);

        if (isEmail) {
          type = 'email';
        }

        const { data } = await apiClient
          .identities
          .getIdentitiesQuery({
            identities: [{ type, value: searchTerm }],
          });

        const identities = data.data
          .map((identity) => ({
            id: identity.uuid,
            imageSrc: identity.avatarUrl,
            publicKey: identity.publicKey,
            username: identity.username || '',
            mainText: isEmail ? identity.email || searchTerm : identity.displayName,
            secondaryText: isEmail ? identity.displayName : identity.email || searchTerm,
          }))
          .filter((identity) => {
            const selectedIdentityIndex = state
              .selectedIdentities
              .findIndex((i) => i.id === identity.id);

            return selectedIdentityIndex === -1;
          });

        setState({
          ...state,
          identities,
          loading: false,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error when trying to search an indentity by name/email: ${error.message}`);

        setState({
          ...state,
          loading: false,
          identities: [],
        });
      }
    },
  };
}
