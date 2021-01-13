import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '../../constants';

const getBackgroundColor = (viewMode, theme) => {
  switch (viewMode) {
    case VIEW_MODES.PREVIEW:
      return '#3B3B3B';
    case VIEW_MODES.DARK:
      return '#212121';
    case VIEW_MODES.LIGHT:
    default:
      return theme.palette.palette.gray4;
  }
};

export default makeStyles((theme) => ({
  root: {
    height: 1,
    backgroundColor: ({ viewMode }) => getBackgroundColor(viewMode, theme),
  },
}));
