import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  adornment: {
    position: 'absolute',
    right: 5,
    '& svg': {
      color: theme.palette.palette.gray18,
    },
  },
  options: {
    '& > div': {
      marginBottom: 14,
    },
  },
  keyIcon: {
    fontSize: 17,
  },
  iconButton: {
    width: 18,
  },
  icon: {
    fontSize: 14,
    color: theme.palette.palette.gray18,
  },
  btnDisabled: {
    '&.MuiButton-contained': {
      color: '#7B7B7B',
      backgroundColor: '#373838',
    },
  },
}));
