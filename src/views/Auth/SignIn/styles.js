import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  signinRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    height: 238,
    maxWidth: 282,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.palette.white,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  buttonGroup: {
    '& > button': {
      margin: '8px 0',
    },
  },
  buttonRoot: {
    height: 39,
    width: 282,
    borderRadius: 3,
    fontWeight: 600,
    textTransform: 'none',
  },
  buttonOutlined: {
    color: theme.palette.palette.white,
  },
}));
