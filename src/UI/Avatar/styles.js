import { makeStyles } from '@material-ui/core/styles';

import { stringToColor } from '@utils';

const DEFAULT_SIZE = 38;

const getSize = ({ size }) => size || DEFAULT_SIZE;

export default makeStyles((theme) => ({
  root: {
    width: getSize,
    height: getSize,
    backgroundColor: ({ username }) => (stringToColor(username)),
    color: ({ username }) => {
      const color = stringToColor(username);

      return theme.palette.getContrastText(color);
    },
  },
}));
