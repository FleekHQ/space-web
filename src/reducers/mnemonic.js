export const MNEMONIC_ACTION_TYPES = {
  ON_RESTART: 'MNEMONIC_ON_RESTART',
  ON_GET_MNEMONIC: 'ON_GET_MNEMONIC',
  ON_GET_MNEMONIC_ERROR: 'ON_GET_MNEMONIC_ERROR',
  ON_GET_MNEMONIC_SUCCESS: 'ON_GET_MNEMONIC_SUCCESS',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  seedphrase: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case MNEMONIC_ACTION_TYPES.ON_GET_MNEMONIC: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case MNEMONIC_ACTION_TYPES.ON_GET_MNEMONIC_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MNEMONIC_ACTION_TYPES.ON_GET_MNEMONIC_SUCCESS: {
      return {
        ...state,
        loading: false,
        seedphrase: action.mnemonic,
      };
    }
    case MNEMONIC_ACTION_TYPES.ON_RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
