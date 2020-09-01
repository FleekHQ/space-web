import { combineReducers } from 'redux';

import usageReducer from './usage';

const settingsReducer = combineReducers({
  usage: usageReducer,
});

export default settingsReducer;
