import uniqBy from 'lodash/uniqBy';

export const STORE_DIR = 'STORE_DIR';
export const ADD_OBJECT = 'ADD_OBJECT';
export const STORE_OBJECTS = 'STORE_OBJECTS';
export const DELETE_OBJECT = 'DELETE_OBJECT';
export const UPDATE_OBJECT = 'UPDATE_OBJECT';
export const UPDATE_OBJECTS = 'UPDATE_OBJECTS';
export const STORE_BUCKETS = 'STORE_BUCKETS';
export const SET_LOADING_STATE_BUCKET = 'SET_LOADING_STATE_BUCKET';
export const SET_ERROR_BUCKET = 'SET_ERROR_BUCKET';

const DEFAULT_STATE = {
  membersList: [],
  objects: [],
  loading: false,
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATE_BUCKET: {
      return {
        ...state,
        loading: action.loading,
        error: null,
      };
    }

    case SET_ERROR_BUCKET: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case STORE_BUCKETS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case STORE_OBJECTS: {
      const objects = uniqBy([
        ...action.payload,
      ], 'fullKey');

      return {
        ...state,
        objects,
      };
    }

    case STORE_DIR: {
      const objects = uniqBy([
        ...state.objects,
        ...action.payload,
      ], 'fullKey');

      return {
        ...state,
        objects,
      };
    }

    case ADD_OBJECT: {
      const objects = [
        action.payload,
        ...state.objects,
      ];

      return {
        ...state,
        objects: uniqBy(objects, 'fullKey'),
      };
    }

    case DELETE_OBJECT: {
      return {
        ...state,
        objects: state.objects.filter(
          (obj) => obj.fullKey !== action.payload.fullKey,
        ),
      };
    }

    case UPDATE_OBJECT: {
      return {
        ...state,
        objects: state.objects.map((obj) => {
          if (obj.fullKey === action.payload.fullKey) return action.payload;
          return obj;
        }),
      };
    }

    case UPDATE_OBJECTS: {
      const newObjs = state.objects.filter((obj) => (
        action.payload.findIndex((newObj) => obj.id === newObj.id) === -1
      ));

      return {
        ...state,
        objects: action.payload.concat(newObjs),
      };
    }

    default:
      return state;
  }
};
