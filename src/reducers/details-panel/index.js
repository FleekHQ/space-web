import { combineReducers } from 'redux';

import shareReducer from './share';

const detailsPanelReducer = combineReducers({
  share: shareReducer,
});

export default detailsPanelReducer;
