import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer from './user';
import storageReducer from './storage';
import modalsReducer from './modals';
import detailsPanelReducer from './details-panel';
import createFolderReducer from './create-folder';
import mnemonicReducer from './mnemonic';
import notificationsReducer from './notifications';
import welcomeReducer from './welcome';
import identitiesReducer from './identities';
import changePasswordReducer from './change-password';
import deleteAccountReducer from './delete-account';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storage: storageReducer,
  modals: modalsReducer,
  detailsPanel: detailsPanelReducer,
  createFolder: createFolderReducer,
  mnemonic: mnemonicReducer,
  notifications: notificationsReducer,
  welcome: welcomeReducer,
  identities: identitiesReducer,
  changePassword: changePasswordReducer,
  deleteAccount: deleteAccountReducer,
  settings: settingsReducer,
});

export default rootReducer;
