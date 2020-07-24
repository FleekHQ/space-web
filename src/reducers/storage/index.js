import get from 'lodash/get';
import bucketReducer, {
  STORE_DIR,
  ADD_OBJECT,
  STORE_OBJECTS,
  DELETE_OBJECT,
  UPDATE_OBJECT,
  UPDATE_OBJECTS,
  STORE_BUCKETS,
} from './bucket';

export * from './bucket';

const DEFAULT_STATE = {
  error: null,
  loading: false,
  searchTerm: '',
  buckets: {
    personal: {
      ...bucketReducer(undefined, {}),
      name: 'personal',
    },
  },
  uploadError: null,
  uploadsList: {},
  bucketsListLoading: false,
};

export const SET_ERROR_STATE = 'SET_ERROR_STATE';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_BUCKETS_LIST_LOADING_STATE = 'SET_BUCKETS_LIST_LOADING_STATE';
export const SEARCH_TERM_CHANGE = 'SEARCH_TERM_CHANGE';
export const SET_UPLOAD_ERROR_STATE = 'SET_UPLOAD_ERROR_STATE';
export const SET_BUCKETS_LIST_ERROR_STATE = 'SET_BUCKETS_LIST_ERROR_STATE';
export const SET_UPLOAD_SUCCESS_STATE = 'SET_UPLOAD_SUCCESS_STATE';

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_TERM_CHANGE: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    case SET_LOADING_STATE: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_BUCKETS_LIST_LOADING_STATE: {
      return {
        ...state,
        bucketsListLoading: action.payload,
      };
    }

    case SET_ERROR_STATE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case SET_BUCKETS_LIST_ERROR_STATE: {
      return {
        ...state,
        bucketsListLoading: false,
        error: action.payload,
      };
    }

    case SET_UPLOAD_ERROR_STATE:
    case SET_UPLOAD_SUCCESS_STATE: {
      return {
        ...state,
        uploadsList: {
          ...state.uploadsList,
          [action.payload.id]: action.payload.payload,
        },
      };
    }

    case STORE_BUCKETS: {
      return {
        ...state,
        bucketsListLoading: false,
        buckets: action.payload.reduce((result, bucketData) => ({
          ...result,
          [bucketData.name]: bucketReducer(state.buckets[bucketData.name], {
            type: STORE_BUCKETS,
            payload: bucketData,
          }),
        }), state.buckets),
      };
    }

    case STORE_OBJECTS:
    case STORE_DIR:
    case ADD_OBJECT:
    case DELETE_OBJECT:
    case UPDATE_OBJECT:
    case UPDATE_OBJECTS: {
      const bucket = get(action.payload, '[0].bucket');
      if (bucket) {
        return {
          ...state,
          buckets: {
            ...state.buckets,
            [bucket]: bucketReducer(state.buckets[bucket], action),
          },
        };
      }

      return state;
    }

    default:
      return state;
  }
};
