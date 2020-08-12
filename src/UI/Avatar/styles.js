import { makeStyles } from '@material-ui/core/styles';

import { stringToColor } from '@utils';

const DEFAULT_SIZE = 38;

const getSize = ({ size }) => size || DEFAULT_SIZE;

export default makeStyles((theme) => ({
  root: {
    width: getSize,
    height: getSize,
    boxSizing: 'initial',
    backgroundColor: ({ username }) => (stringToColor(username)),
    color: ({ username }) => {
      const color = stringToColor(username);

      return theme.palette.getContrastText(color);
    },
    border: ({ active }) => {
      if (!active) {
        return null;
      }

      return '2px solid black';
    },
  },
}));
