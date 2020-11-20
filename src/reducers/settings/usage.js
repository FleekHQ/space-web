export const USAGE_SETTINGS_ACTION_TYPES = {
  FETCH_USAGE_INFO: 'FETCH_USAGE_INFO',
  FETCH_USAGE_INFO_SUCCESS: 'FETCH_USAGE_INFO_SUCCESS',
  FETCH_USAGE_INFO_ERROR: 'FETCH_USAGE_INFO_ERROR',
  TOGGLE_BACKUP: 'TOGGLE_BACKUP',
  TOGGLE_BACKUP_SUCCESS: 'TOGGLE_BACKUP_SUCCESS',
  TOGGLE_BACKUP_ERROR: 'TOGGLE_BACKUP_ERROR',
};

const defaultState = {
  loading: false,
  error: null,
  planName: 'Free plan',
  usageData: {
    success: false,
    localUsage: {
      storage: 0,
      bandwidth: 0,
      combinedUsage: 0,
    },
    backupUsage: {
      storage: 0,
      bandwidth: 0,
      combinedUsage: 0,
      limit: 0,
    },
  },
  backupEnabled: undefined, // to show optimistic response
  backupEnabledPrevValue: undefined, // if error, revert to old value
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO: {
      return {
        ...state,
        loading: true,
      };
    }

    case USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO_SUCCESS: {
      return {
        ...state,
        usageData: {
          success: true,
          ...action.payload,
        },
        loading: false,
      };
    }

    case USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP: {
      return {
        ...state,
        backupEnabledPrevValue: state.backupEnabled,
        backupEnabled: action.payload,
      };
    }

    case USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP_ERROR: {
      return {
        ...state,
        backupEnabledPrevValue: undefined,
        backupEnabled: state.backupEnabledPrevValue,
      };
    }

    case USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP_SUCCESS: {
      return {
        ...state,
        backupEnabledPrevValue: undefined,
        ...!state.backupEnabled && {
          usageData: {
            ...state.usageData,
            backupUsage: defaultState.usageData.backupUsage,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
