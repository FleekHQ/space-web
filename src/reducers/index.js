import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer from './user';
import storageReducer from './storage';
import modalsReducer from './modals';
import detailsPanelReducer from './details-panel';
import createFolderReducer from './create-folder';
import mnemonicReducer from './mnemonic';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storage: storageReducer,
  modals: modalsReducer,
  detailsPanel: detailsPanelReducer,
  createFolder: createFolderReducer,
  mnemonic: mnemonicReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
