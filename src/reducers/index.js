import { combineReducers } from 'redux';

import userReducer from './user';
import storageReducer from './storage';

const rootReducer = combineReducers({
  user: userReducer,
  storage: storageReducer,
});

export default rootReducer;
