import { combineReducers } from 'redux';

import signinReducer from './signin';
import signupReducer from './signup';
import signoutReducer from './signout';
import restoreKeysMnemonicReducer from './restore-keys-mnemonic';

const authReducer = combineReducers({
  signin: signinReducer,
  signup: signupReducer,
  signout: signoutReducer,
  restoreKeysMnemonic: restoreKeysMnemonicReducer,
});

export default authReducer;
