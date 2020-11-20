import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    minWidth: 30,
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundColor: '#e4e4e4',
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
});
