import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    color: theme.palette.palette.gray1,
    display: 'flex',
    '& > *': {
      marginRight: 6,
    },
  },
  avatarImg: {
    width: 17,
    height: 17,
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));
