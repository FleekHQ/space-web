import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer from './user';
import storageReducer from './storage';
import modalsReducer from './modals';
import detailsPanelReducer from './details-panel';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storage: storageReducer,
  modals: modalsReducer,
  detailsPanel: detailsPanelReducer,
});

export default rootReducer;
