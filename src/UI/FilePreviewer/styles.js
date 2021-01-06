import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  imgContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    minWidth: 500,
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
}));
