export const LINKED_ADDRESSES_ACTION_TYPES = {
  ON_GET_LINKED_ADDRESSES: 'ON_GET_LINKED_ADDRESSES',
  ON_GET_LINKED_ADDRESSES_ERROR: 'ON_GET_LINKED_ADDRESSES_ERROR',
  ON_GET_LINKED_ADDRESSES_SUCCESS: 'ON_GET_LINKED_ADDRESSES_SUCCESS',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  data: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case LINKED_ADDRESSES_ACTION_TYPES.ON_GET_LINKED_ADDRESSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.addresses,
      };
    }
    case LINKED_ADDRESSES_ACTION_TYPES.UPDATE_LINKED_ADDRESSES: {
      return {
        ...state,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
