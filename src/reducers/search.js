const DEFAULT_STATE = {
  searchTerm: '',
  results: null,
};

export const SEARCH_ACTION_TYPES = {
  SET_RESULTS: 'SET_RESULTS',
  SET_SEARCHTERM: 'SET_SEARCHTERM',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.SET_RESULTS: {
      return {
        ...state,
        results: action.payload,
      };
    }

    case SEARCH_ACTION_TYPES.SET_SEARCHTERM: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
