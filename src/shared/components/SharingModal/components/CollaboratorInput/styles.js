import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 25,
    height: 25,
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundColor: theme.palette.palette.gray10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginRight: 8,
  },
  icon: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
