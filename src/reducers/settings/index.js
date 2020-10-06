import { combineReducers } from 'redux';

import usageReducer from './usage';
import accountReducer from './account';
import productKeyReducer from './product-key';

const settingsReducer = combineReducers({
  usage: usageReducer,
  account: accountReducer,
  productKey: productKeyReducer,
});

export default settingsReducer;
