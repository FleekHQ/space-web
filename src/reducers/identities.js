export const IDENTITIES_ACTION_TYPES = {
  ON_GET_IDENTITIES: 'ON_GET_IDENTITIES',
  ON_GET_IDENTITIES_ERROR: 'ON_GET_IDENTITIES_ERROR',
  ON_GET_IDENTITIES_SUCCESS: 'ON_GET_IDENTITIES_SUCCESS',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  identities: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_SUCCESS: {
      const newIdentities = action.identities.reduce((identities, identity) => ({
        ...identities,
        [identity.publicKey]: { ...identity },
      }), {});

      return {
        ...state,
        loading: false,
        identities: {
          ...state.identities,
          ...newIdentities,
        },
      };
    }
    default: {
      return state;
    }
  }
};
