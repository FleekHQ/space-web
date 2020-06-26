import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '@shared/components/Modal/actions';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return [
        ...state,
        action.payload,
      ];
    }
    case CLOSE_MODAL: {
      return state.filter((modal) => modal.id !== action.payload);
    }
    default: {
      return state;
    }
  }
};
