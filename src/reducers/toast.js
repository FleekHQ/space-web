export const TOAST_ACTION_TYPES = {
  OPEN_TOAST: 'OPEN_TOAST',
  CLOSE_TOAST: 'CLOSE_TOAST',
};

const DEFAULT_STATE = {
  open: false,
  type: 'success',
  message: '',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOAST_ACTION_TYPES.OPEN_TOAST: {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }

    case TOAST_ACTION_TYPES.CLOSE_TOAST: {
      return {
        ...DEFAULT_STATE,
      };
    }

    default: {
      return state;
    }
  }
};
