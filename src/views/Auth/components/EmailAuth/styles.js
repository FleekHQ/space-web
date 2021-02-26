import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  adornment: {
    position: 'absolute',
    right: 5,
    '& svg': {
      color: theme.palette.palette.gray18,
    },
  },
  btnRoot: {
    height: 41,
    fontFamily: 'Inter',
  },
  btnDisabled: {
    '&.MuiButton-contained': {
      color: '#7B7B7B',
      backgroundColor: '#373838',
    },
  },
  iconButton: {
    width: 18,
  },
  icon: {
    fontSize: 14,
    color: theme.palette.palette.gray18,
  },
  linkButton: {
    marginTop: -2,
    fontFamily: 'Inter',
    textDecoration: 'underline',
  },
  emailField: {
    '& input': {
      backgroundColor: theme.palette.palette.black,
    },
    '& div > div > div > div': {
      backgroundColor: theme.palette.palette.black,
    },
    '&&& div > div > div > label': {
      backgroundColor: theme.palette.palette.black,
    },
  },
}));
