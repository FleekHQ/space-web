const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
  publicKey: null,
  showPassword: false,
  tfUsername: {
    value: '',
    isValid: false,
    isFocus: false,
  },
};

export const SIGNUP_ACTION_TYPES = {
  ON_SUBMIT: 'ON_SUBMIT',
  ON_INPUT_CHANGE: 'ON_INPUT_CHANGE',
  ON_SUBMIT_ERROR: 'ON_SUBMIT_ERROR',
  ON_SUBMIT_SUCCESS: 'ON_SUBMIT_SUCCESS',
  ON_GET_PUBLIC_KEY: 'ON_GET_PUBLIC_KEY',
  ON_INPUT_FOCUS_BLUR: 'ON_INPUT_FOCUS_BLUR',
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
        loading: true,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY: {
      return {
        ...state,
        publicKey: action.publicKey,
      };
    }
    default: {
      return state;
    }
  }
};
