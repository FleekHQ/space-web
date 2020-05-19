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
    '& svg': {
      height: 19,
    },
    color: theme.palette.icons.babyBlue,
  },
  default: {
    '& svg': {
      height: 8,
    },
    backgroundColor: theme.palette.icons.grey,
    color: 'white',
  },
  pdf: {
    backgroundColor: theme.palette.icons.red
  },
  zip: {
    backgroundColor: theme.palette.icons.black
  },
  powerpoint: {
    '& svg': {
      height: 10,
    },
    backgroundColor: theme.palette.icons.yellow,
    color: 'white',
  },
  word: {
    '& svg': {
      height: 9,
    },
    backgroundColor: theme.palette.icons.blue,
    color: 'white',
  },
  text: {
    fontSize: '6px',
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
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
    '& svg': {
      height: 10,
    },
    backgroundColor: theme.palette.icons.green,
    color: 'white',
  },
  video: {
    '& svg': {
      height: 10,
    },
    backgroundColor: theme.palette.icons.purple,
    color: 'white',
  },
}));
