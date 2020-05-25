import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folder: {
    '&& svg': {
      height: '90%',
      width: '90%',
    },
    color: theme.palette.icons.babyBlue,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
    objectFit: 'cover',
  },
  iconImg:{
    width: '100%',
  },
}));
