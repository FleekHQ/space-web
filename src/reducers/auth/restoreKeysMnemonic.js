const DEFAULT_STATE = {
  error: null,
  loading: false,
  mnemonic: '',
};

export const RESTORE_KEYS_MNEMONIC_ACTION_TYPES = {
  CLEAR_STATE: 'RECOVER_ACCOUNT_CLEAR',
  ON_SUBMIT: 'RECOVER_ACCOUNT_ON_SUBMIT',
  ON_INPUT_CHANGE: 'RECOVER_ACCOUNT_ON_INPUT_CHANGE',
  ON_SUBMIT_ERROR: 'RECOVER_ACCOUNT_ON_SUBMIT_ERROR',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.CLEAR_STATE: {
      return DEFAULT_STATE;
    }
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_INPUT_CHANGE: {
      return {
        ...state,
        error: null,
        mnemonic: action.payload,
      };
    }
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
