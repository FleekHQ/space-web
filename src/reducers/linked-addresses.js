export const LINKED_ADDRESSES_ACTION_TYPES = {
  ON_GET_LINKED_ADDRESSES: 'ON_GET_LINKED_ADDRESSES',
  ON_GET_LINKED_ADDRESSES_ERROR: 'ON_GET_LINKED_ADDRESSES_ERROR',
  ON_GET_LINKED_ADDRESSES_SUCCESS: 'ON_GET_LINKED_ADDRESSES_SUCCESS',
  ON_ADD_NEW_LINKED_ADDRESS: 'ON_ADD_NEW_LINKED_ADDRESS',
  ON_ADD_NEW_LINKED_ADDRESS_RESET: 'ON_ADD_NEW_LINKED_ADDRESS_RESET',
  ON_ADD_NEW_LINKED_ADDRESS_SUCCESS: 'ON_ADD_NEW_LINKED_ADDRESS_SUCCESS',
  ON_ADD_NEW_LINKED_ADDRESS_ERROR: 'ON_ADD_NEW_LINKED_ADDRESS_ERROR',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  data: [],
  addLinkedAddress: {
    loading: false,
    error: null,
    success: false,
  },
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

    case LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS: {
      return {
        ...state,
        addLinkedAddress: {
          loading: true,
          error: null,
          success: false,
        },
      };
    }

    case LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_RESET: {
      return {
        ...state,
        addLinkedAddress: {
          loading: false,
          error: null,
          success: false,
        },
      };
    }

    case LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_SUCCESS: {
      return {
        ...state,
        addLinkedAddress: {
          loading: false,
          error: null,
          success: true,
        },
        data: [
          ...state.data,
          action.payload,
        ],
      };
    }

    case LINKED_ADDRESSES_ACTION_TYPES.ON_ADD_NEW_LINKED_ADDRESS_ERROR: {
      return {
        ...state,
        addLinkedAddress: {
          loading: false,
          error: action.error,
          success: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};
