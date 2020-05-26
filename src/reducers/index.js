import { combineReducers } from 'redux';

import storageReducer from './storage';

const rootReducer = combineReducers({
  storage: storageReducer,
});

export default rootReducer;
