import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_SIZE = 38;

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '100%',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    width: ({ size }) => size || DEFAULT_SIZE,
    height: ({ size }) => size || DEFAULT_SIZE,
    '& > *': {
      width: 'inherit',
      height: 'inherit',
    },
    '& > img': {
      margin: '0 -5px',
      objectFit: 'cover',
    },
  },
});
