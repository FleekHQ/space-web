import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: 18,
    height: 18,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folder: {
    fontSize: 19,
    color: theme.palette.palette.babyBlue,
  },
  default: {
    fontSize: 8,
    backgroundColor: theme.palette.palette.secondary,
    color: 'white',
  },
  pdf: {
    backgroundColor: theme.palette.palette.red
  },
  zip: {
    backgroundColor: theme.palette.palette.black
  },
  powerpoint: {
    fontSize: 10,
    backgroundColor: theme.palette.palette.yellow,
    color: 'white',
  },
  word: {
    fontSize: 9,
    backgroundColor: theme.palette.palette.blue,
    color: 'white',
  },
  text: {
    fontSize: '6px !important',
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
    position: 'relative',
    top: 1,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    borderRadius: 3,
    height: 18,
    width: 18,
    transform: 'scale(2.5)'
  },
  audio: {
    fontSize: 10,
    backgroundColor: theme.palette.palette.green,
    color: 'white',
  },
  video: {
    fontSize: 10,
    backgroundColor: theme.palette.palette.purple,
    color: 'white',
  },
}));
