import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from './constants';

export const DETAILS_PANEL_WIDTH = 214;

const getBackgroundColor = (viewMode, theme) => {
  switch (viewMode) {
    case VIEW_MODES.PREVIEW:
      return '#242424';
    case VIEW_MODES.DARK:
      return theme.palette.palette.black;
    case VIEW_MODES.LIGHT:
    default:
      return theme.palette.palette.white;
  }
};

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    width: DETAILS_PANEL_WIDTH,
    padding: '0px 24px',
    boxSizing: 'border-box',
    backgroundColor: ({ viewMode }) => getBackgroundColor(viewMode, theme),
  },
}));
