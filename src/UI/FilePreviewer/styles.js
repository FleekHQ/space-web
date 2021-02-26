import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  imgContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  txt: {
    backgroundColor: theme.palette.palette.white,
  },
  fileIconContainer: {
    height: 188,
    width: 188,
  },
}));
