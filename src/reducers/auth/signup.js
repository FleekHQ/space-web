const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
  loadingLater: false,
  showPassword: false,
  publicKey: {
    key: null,
    error: null,
    loading: false,
  },
  tfUsername: {
    value: '',
    isValid: false,
    isFocus: false,
  },
};

export const SIGNUP_ACTION_TYPES = {
  ON_RESET: 'SIGNUP_ON_RESET',
  ON_SUBMIT: 'SIGNUP_ON_SUBMIT',
  ON_INPUT_CHANGE: 'SIGNUP_ON_INPUT_CHANGE',
  ON_SUBMIT_ERROR: 'SIGNUP_ON_SUBMIT_ERROR',
  ON_SUBMIT_SUCCESS: 'SIGNUP_ON_SUBMIT_SUCCESS',
  ON_GET_PUBLIC_KEY: 'SIGNUP_ON_GET_PUBLIC_KEY',
  ON_GET_PUBLIC_KEY_ERROR: 'SIGNUP_ON_GET_PUBLIC_KEY_ERROR',
  ON_GET_PUBLIC_KEY_SUCCESS: 'SIGNUP_ON_GET_PUBLIC_KEY_SUCCESS',
  ON_INPUT_FOCUS_BLUR: 'SIGNUP_ON_INPUT_FOCUS_BLUR',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_ACTION_TYPES.ON_INPUT_CHANGE: {
      return {
        ...state,
        error: null,
        [action.input.key]: {
          ...state[action.input.key],
          value: action.input.value,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_INPUT_FOCUS_BLUR: {
      return {
        ...state,
        [action.input.key]: {
          ...state[action.input.key],
          isFocus: !state[action.input.key].isFocus,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: action.withUsername,
        loadingLater: !action.withUsername,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        loadingLater: false,
        error: action.error,
        publicKey: {
          ...state.publicKey,
          loading: false,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loadingLater: false,
        success: true,
        publicKey: {
          ...state.publicKey,
          loading: false,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY: {
      return {
        ...state,
        error: null,
        publicKey: {
          key: null,
          error: null,
          loading: true,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY_ERROR: {
      return {
        ...state,
        publicKey: {
          key: null,
          loading: false,
          error: action.error,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY_SUCCESS: {
      return {
        ...state,
        publicKey: {
          ...state.publicKey,
          error: null,
          key: action.publicKey,
        },
      };
    }
    case SIGNUP_ACTION_TYPES.ON_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
