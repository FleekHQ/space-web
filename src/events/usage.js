import { USAGE_SETTINGS_ACTION_TYPES } from '@reducers/settings/usage';

import store from '../store';

const registerUsageEvents = () => {
};

export const fetchUsageData = () => {
  store.dispatch({
    type: USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO,
  });
};

export default registerUsageEvents;
