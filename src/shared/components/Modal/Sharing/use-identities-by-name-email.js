import React from 'react';

import { checkIsEmail } from '@utils';
import { apiClient } from '@clients';

/* const MOCK = [
  {
    id: 1,
    mainText: 'Giancarlo',
    secondaryText: '',
    email: 'giancarlo@fleek.co',
    username: 'giancarlo',
    publicKey: '12312313123123123',
  },
  {
    id: 2,
    mainText: 'Giancarlo 1',
    secondaryText: '',
    email: 'giancarlo+1@fleek.co',
    username: 'giancarlo+1',
    publicKey: '34534534534534345',
  },
  {
    id: '63251efe-2d70-4a0c-bb53-af6630cf363d',
    mainText: 'giancarlo+20@fleek.co',
    email: 'giancarlo+20@fleek.co',
    secondaryText: '',
    username: '',
    publicKey: '9a6aa4cc9c8853269c78360d11baeec09d640b9e60c71932e9450fa079089066',
  },
]; */

/**
 * Use identities by name or email hook
 */
export default function useIdentitiesByNameOrEmail() {
  const [state, setState] = React.useState({
    error: null,
    loading: true,
    identities: [],
    selectedIdentities: [],
  });

  return {
    loading: state.loading,
    identities: state.identities,
    selectedIdentities: state.selectedIdentities,
    searchIdentityTerm: state.searchIdentityTerm,
    onRemoveSelectedIdentity: (identity) => {
      setState((prevState) => ({
        ...prevState,
        selectedIdentities: prevState.selectedIdentities.filter((i) => i.id !== identity.id),
      }));
    },
    onSelectIdentity: (selectedIdentity) => {
      setState((prevState) => ({
        ...prevState,
        identities: [],
        selectedIdentities: [...prevState.selectedIdentities, selectedIdentity],
      }));
    },
    onChangeSearchIdentityTerm: async (searchTerm) => {
      setState({
        ...state,
        loading: true,
      });
      try {
        let type = 'displayName';

        if (checkIsEmail(searchTerm)) {
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
            mainText: type === 'email' ? identity.email || searchTerm : identity.displayName,
            secondaryText: type === 'email' ? identity.displayName : identity.email || searchTerm,
            username: identity.username || '',
            publicKey: identity.publicKey,
            imageSrc: identity.avatarUrl,
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
