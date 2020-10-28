import { SEARCH_ACTION_TYPES } from '@reducers/search';

import getMockResults from './mock-results';

/* eslint-disable import/prefer-default-export */
export const fetchResults = (searchTerm) => (dispatch) => {
  dispatch({
    type: SEARCH_ACTION_TYPES.SET_SEARCHTERM,
    payload: searchTerm,
  });

  if (searchTerm === '') {
    dispatch({
      type: SEARCH_ACTION_TYPES.SET_RESULTS,
      payload: null,
    });
  } else {
    // TODO: Replace mock data by gRPC call
    dispatch({
      type: SEARCH_ACTION_TYPES.SET_RESULTS,
      payload: getMockResults(searchTerm),
    });
  }
};
