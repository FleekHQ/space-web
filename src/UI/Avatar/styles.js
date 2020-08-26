import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_SIZE = 38;

const getSize = ({ size }) => size || DEFAULT_SIZE;

export default makeStyles((theme) => ({
  root: {
    width: getSize,
    height: getSize,
    boxSizing: 'initial',
    backgroundColor: theme.palette.palette.gray10,
    border: ({ active }) => {
      if (!active) {
        return null;
      }

      return '2px solid black';
    },
  },
  icon: {
    color: 'black',
    fontSize: '0.8em',
  },
}));
