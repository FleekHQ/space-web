export const PRODUCT_KEY_ACTION_TYPES = {
  CLAIM_WALLET: 'CLAIM_WALLET',
  CLAIM_WALLET_ERROR: 'CLAIM_WALLET_ERROR',
  CLAIM_WALLET_SUCCESS: 'CLAIM_WALLET_SUCCESS',
};

const defaultState = {
  error: null,
  planInfo: null,
  success: false,
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET: {
      return {
        error: null,
        loading: true,
        success: false,
      };
    }
    case PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        planInfo: action.planInfo,
      };
    }

    default: {
      return state;
    }
  }
};
