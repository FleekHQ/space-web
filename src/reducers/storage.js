import uniqBy from 'lodash/uniqBy';

const DEFAULT_STATE = {
  error: null,
  objects: [],
  loading: false,
  searchTerm: '',
  buckets: {
    error: null,
    isLoading: false,
  },
  uploadError: null,
};

export const STORE_OBJECTS = 'STORE_OBJECTS';
export const SET_ERROR_STATE = 'SET_ERROR_STATE';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SEARCH_TERM_CHANGE = 'SEARCH_TERM_CHANGE';
export const SET_UPLOAD_ERROR_STATE = 'SET_UPLOAD_ERROR_STATE';


export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_TERM_CHANGE: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    case STORE_OBJECTS: {
      const objects = uniqBy([
        ...action.payload,
      ], 'fullKey');

      return {
        ...state,
        objects,
        loading: false,
      };
    }

    case SET_LOADING_STATE: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_ERROR_STATE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case SET_UPLOAD_ERROR_STATE: {
      return {
        ...state,
        uploadError: action.payload,
      };
    }

    default:
      return state;
  }
};
