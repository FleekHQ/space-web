/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkIsEmail } from '@utils';
import { apiClient } from '@clients';
import {
  mapKeyedIdentitiesToMembers,
} from './helpers';

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
  const storedIdentities = useSelector((s) => s.identities);
  const mappedIdentities = mapKeyedIdentitiesToMembers(storedIdentities);

  const [loading, setLoading] = useState(true);
  const [identities, setIdentities] = useState([]);
  const [selectedIdentities, setSelectedIdentities] = useState([]);

  useEffect(() => {
    setIdentities(mappedIdentities);
  }, [storedIdentities]);

  return {
    loading,
    identities,
    selectedIdentities,
    /**
     * Remove specific identity from `selectedIdentity` list
     * @param {Identity} identity
     * @returns {void}
     */
    onRemoveSelectedIdentity: (identity) => {
      setSelectedIdentities(selectedIdentities.filter((i) => i.id !== identity.id));
    },
    onSelectIdentity: (selectedIdentity) => {
      setIdentities([]);
      setSelectedIdentities([...selectedIdentities, selectedIdentity]);
    },
    /**
     * Search identity by term, could be displayName or email
     * @param {string} searchTerm
     * @returns {void}
     */
    onChangeSearchIdentityTerm: async (searchTerm) => {
      setLoading(true);
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

        const queriedIdentities = data.data
          .map((identity) => ({
            id: identity.uuid,
            imageSrc: identity.avatarUrl,
            publicKey: identity.publicKey,
            username: identity.username || '',
            mainText: isEmail ? identity.email || searchTerm : identity.displayName,
            secondaryText: isEmail ? identity.displayName : identity.email || searchTerm,
          }))
          .filter((identity) => {
            const selectedIdentityIndex = selectedIdentities
              .findIndex((i) => i.id === identity.id);

            return selectedIdentityIndex === -1;
          });

        setIdentities(queriedIdentities);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error when trying to search an indentity by name/email: ${error.message}`);

        setLoading(false);
        setIdentities([]);
      }
    },
    reloadStoredIdentities: (selectedIdentity = {}) => {
      const filterIds = [...selectedIdentities.map((identity) => identity.id), selectedIdentity.id];
      const filteredStoredIdentities = mappedIdentities.filter((i) => !filterIds.includes(i.id));

      setIdentities(filteredStoredIdentities);
    },
  };
}
