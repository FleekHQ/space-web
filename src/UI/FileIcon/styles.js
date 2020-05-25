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
    borderRadius: 2,
    height: '100%',
    width: '100%',
  },
  iconImg:{ 
    width: '100%',
  },
}));
