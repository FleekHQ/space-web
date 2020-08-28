import { combineReducers } from 'redux';

import signinReducer from './signin';
import signupReducer from './signup';
import restoreKeysMnemonicReducer from './restore-keys-mnemonic';

const authReducer = combineReducers({
  signin: signinReducer,
  signup: signupReducer,
  restoreKeysMnemonic: restoreKeysMnemonicReducer,
});

export default authReducer;
