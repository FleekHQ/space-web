import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171717',
  },
  dividerRoot: {
    color: '#5A5A5A',
    backgroundColor: '#5A5A5A',
  },
  linkButton: {
    marginTop: -2,
    font: 'inherit',
    textDecoration: 'underline',
  },
});
