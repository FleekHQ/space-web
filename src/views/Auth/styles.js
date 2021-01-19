import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 56px)',
    },
  },
  authContainer: {
    backgroundColor: theme.palette.palette.black,
    padding: '52px 48px',
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      padding: '32px 25px',
    },
  },
  linkButton: {
    marginTop: -2,
    fontFamily: 'Inter',
    textDecoration: 'underline',
  },
}));
