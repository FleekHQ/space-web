import { combineReducers } from 'redux';

import signupReducer from './signup';
import restoreKeysMnemonicReducer from './restoreKeysMnemonic';

const authReducer = combineReducers({
  signup: signupReducer,
  restoreKeysMnemonic: restoreKeysMnemonicReducer,
});

export default authReducer;
