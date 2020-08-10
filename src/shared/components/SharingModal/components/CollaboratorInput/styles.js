import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  imageContainer: {
    width: 15,
    height: 15,
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundColor: theme.palette.palette.gray10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginRight: 8,
  },
  icon: {
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
