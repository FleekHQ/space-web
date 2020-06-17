import { combineReducers } from 'redux';

import userReducer from './user';
import storageReducer from './storage';
import modalsReducer from './modals';

const rootReducer = combineReducers({
  user: userReducer,
  storage: storageReducer,
  modals: modalsReducer,
});

export default rootReducer;
