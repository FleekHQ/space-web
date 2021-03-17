import { combineReducers } from 'redux';

import shareReducer from './share';
import moveReducer from './move';

const detailsPanelReducer = combineReducers({
  share: shareReducer,
  move: moveReducer,
});

export default detailsPanelReducer;
