import electronStore from '@electron-store';

export const WELCOME_ACTION_TYPES = {
  ON_DISMISS: 'WELCOME_ON_DISMISS',
};

let welcome;
const WELCOME_KEY = '_w';

try {
  welcome = JSON.parse(electronStore.get(WELCOME_KEY));
} catch (error) {
  welcome = {
    hideBackup: false,
    hideUsername: false,
    hideIntegration: false,
  };
}

export default (state = welcome, action) => {
  switch (action.type) {
    case WELCOME_ACTION_TYPES.ON_DISMISS: {
      const newState = {
        ...state,
        [action.key]: true,
      };
      electronStore.set(WELCOME_KEY, JSON.stringify(newState));

      return newState;
    }
    default: {
      return state;
    }
  }
};
