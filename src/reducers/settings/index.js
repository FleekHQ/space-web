import { combineReducers } from 'redux';

import usageReducer from './usage';
import accountReducer from './account';

const settingsReducer = combineReducers({
  usage: usageReducer,
  account: accountReducer,
});

export default settingsReducer;
