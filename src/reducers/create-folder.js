const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
  folderName: '',
};

export const CREATE_FOLDER_ACTION_TYPES = {
  ON_SUBMIT: 'CREATE_FOLDER_ON_SUBMIT',
  ON_RESTART: 'CREATE_FOLDER_ON_RESTART',
  ON_INPUT_CHANGE: 'CREATE_FOLDER_ON_INPUT_CHANGE',
  ON_SUBMIT_ERROR: 'CREATE_FOLDER_ON_SUBMIT_ERROR',
  ON_SUBMIT_SUCCESS: 'CREATE_FOLDER_ON_SUBMIT_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CREATE_FOLDER_ACTION_TYPES.ON_INPUT_CHANGE: {
      return {
        ...state,
        error: null,
        folderName: action.folderName,
      };
    }
    case CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case CREATE_FOLDER_ACTION_TYPES.ON_RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
