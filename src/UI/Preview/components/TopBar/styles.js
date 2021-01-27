import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.palette.white,
    padding: '15px 22px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceLogo: {
    height: 30,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  ctaContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > button': {
      width: 22,
      height: 22,
    },
    '& > button:not(:last-child)': {
      marginRight: 25,
    },
    '& button > svg': {
      fontSize: 22,
    },
    '& > button:disabled': {
      color: theme.palette.palette.gray1,
    },
  },
  signinButton: {
    fontSize: 14,
    fontWeight: 600,
    padding: '10px 16px',
    '&&&': {
      width: 'auto',
      height: 'auto',
    },
  },
  backIcon: {
    fontSize: 19,
    marginRight: 18,
  },
  topBarPopper: {
    zIndex: 2000,
  },
}));
