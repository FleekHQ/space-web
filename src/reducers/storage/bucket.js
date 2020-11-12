import uniqBy from 'lodash/uniqBy';

import { CREATE_FOLDER_ACTION_TYPES } from '../create-folder';

export const STORE_DIR = 'STORE_DIR';
export const ADD_OBJECT = 'ADD_OBJECT';
export const STORE_OBJECTS = 'STORE_OBJECTS';
export const DELETE_OBJECT = 'DELETE_OBJECT';
export const UPDATE_OBJECTS = 'UPDATE_OBJECTS';
export const STORE_BUCKETS = 'STORE_BUCKETS';
export const UPDATE_OR_ADD_OBJECT = 'UPDATE_OR_ADD_OBJECT';
export const SET_LOADING_STATE_BUCKET = 'SET_LOADING_STATE_BUCKET';
export const SET_ERROR_BUCKET = 'SET_ERROR_BUCKET';
export const SET_OPEN_ERROR_BUCKET = 'SET_OPEN_ERROR_BUCKET';
export const UPDATE_SHARE_AMOUNT_OBJECTS = 'UPDATE_SHARE_AMOUNT_OBJECTS';

const DEFAULT_STATE = {
  membersList: [],
  objects: [],
  loading: false,
  error: null,
  openError: null,
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

    case SET_OPEN_ERROR_BUCKET: {
      return {
        ...state,
        openError: action.error,
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

    case ADD_OBJECT:
    case CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
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

    case UPDATE_OR_ADD_OBJECT: {
      let objects = [];
      const objectIndex = state.objects.findIndex((obj) => obj.fullKey === action.payload.fullKey);

      if (objectIndex >= 0) {
        objects = state.objects.map((obj) => {
          if (obj.fullKey === action.payload.fullKey) {
            return {
              ...obj,
              ...action.payload,
              selected: typeof action.payload.selected === 'boolean'
                ? action.payload.selected
                : obj.selected,
              members: [
                ...obj.members,
                ...action.payload.members,
              ],
            };
          }

          return obj;
        });
      } else {
        objects = [
          ...state.objects,
          action.payload,
        ];
      }

      return {
        ...state,
        objects,
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

    case UPDATE_SHARE_AMOUNT_OBJECTS: {
      return {
        ...state,
        objects: state.objects.map((obj) => {
          if (action.payload.paths.includes(obj.key)) {
            return {
              ...obj,
              shareAmount: obj.shareAmount + action.payload.newMembers.length,
              members: [
                ...obj.members,
                ...action.payload.newMembers,
              ],
            };
          }
          return obj;
        }),
      };
    }

    default:
      return state;
  }
};
