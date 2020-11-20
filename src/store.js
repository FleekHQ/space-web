import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from '@reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, {
  // TODO: remove hardcoded init state
  user: {
    uuid: '1f43cec7-472b-47d8-b4ec-08d1d8f5e687',
    address: '0x9fa66f2cc560cbeaf85cb6ce6756ba77f655',
    publicKey: '4a0d2893c9e57839195acb5dfb818c9782f89136ff6d5a4dcea9626c3d74d502',
    username: 'teester20m',
    avatarUrl: '',
  },
  welcome: {
    hideBackup: false,
    hideUsername: false,
    hideIntegration: false,
  },
}, enhancer);

export default store;
