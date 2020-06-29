import { combineReducers } from 'redux';

import signupReducer from './signup';

const authReducer = combineReducers({
  signup: signupReducer,
});

export default authReducer;
