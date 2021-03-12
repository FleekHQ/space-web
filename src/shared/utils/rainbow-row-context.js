import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const RainbowRowStateContext = createContext();
const RainbowRowDispatchContext = createContext();

const RAINBOW_ROW_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
};

const rainbowRowReducer = (state, action) => {
  switch (action.type) {
    case 'remove': {
      if (state.defaultValue) {
        return {
          ...state,
          active: true,
          rowIndex: state.defaultValue.rowIndex,
        };
      }
      if (action.rowIndex === undefined || state.rowIndex === action.rowIndex) {
        return {
          ...state,
          active: false,
        };
      }
      return state;
    }
    case 'add': {
      return {
        ...state,
        active: true,
        rowIndex: action.rowIndex,
      };
    }
    case 'addDefault': {
      if (!state.active) {
        return {
          active: true,
          rowIndex: action.rowIndex,
          defaultValue: {
            rowIndex: action.rowIndex,
          },
        };
      }
      return {
        ...state,
        defaultValue: {
          rowIndex: action.rowIndex,
        },
      };
    }
    case 'removeDefault': {
      return {
        ...state,
        defaultValue: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const RainbowRowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rainbowRowReducer, { active: false });

  return (
    <RainbowRowStateContext.Provider value={state}>
      <RainbowRowDispatchContext.Provider value={dispatch}>
        {children}
      </RainbowRowDispatchContext.Provider>
    </RainbowRowStateContext.Provider>
  );
};

RainbowRowProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const useRainbowRowState = () => {
  const context = useContext(RainbowRowStateContext);

  if (context === undefined) {
    throw new Error('useRainbowRowState must be used within a RainbowRow provider');
  }

  return context;
};

const useRainbowRowDispatch = () => {
  const context = useContext(RainbowRowDispatchContext);

  if (context === undefined) {
    throw new Error('useRainbowRowDispatch must be used within a RainbowRow provider');
  }

  return context;
};

const useRainbowRow = () => (
  [useRainbowRowState(), useRainbowRowDispatch()]
);

export {
  RainbowRowProvider,
  useRainbowRowState,
  useRainbowRowDispatch,
  useRainbowRow,
  RAINBOW_ROW_ACTIONS,
};
