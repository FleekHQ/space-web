import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer, { USER_ACTION_TYPES } from './user';
import storageReducer from './storage';
import modalsReducer from './modals';
import detailsPanelReducer from './details-panel';
import createFolderReducer from './create-folder';
import mnemonicReducer from './mnemonic';
import notificationsReducer from './notifications';
import welcomeReducer from './welcome';
import identitiesReducer from './identities';
import changePasswordReducer from './change-password';
import publicFileLinkReducer from './public-file-link';
import deleteAccountReducer from './delete-account';
import settingsReducer from './settings';
import openPublicFileReducer from './open-public-file';
import searchReducer from './search';
import linkedAddressesReducer from './linked-addresses';
import deleteObjectReducer from './delete-object';
import toastReducer from './toast';
import downloadsReducer from './downloads';

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
  publicFileLink: publicFileLinkReducer,
  deleteAccount: deleteAccountReducer,
  settings: settingsReducer,
  openPublicFile: openPublicFileReducer,
  search: searchReducer,
  linkedAddresses: linkedAddressesReducer,
  deleteObject: deleteObjectReducer,
  toast: toastReducer,
  downloads: downloadsReducer,
});

/* eslint-disable no-param-reassign */
export default (state, action) => {
  // Reset to default state when user log out
  if (action.type === USER_ACTION_TYPES.ON_USER_LOGOUT) {
    state = undefined;
  }

  return rootReducer(state, action);
};
