import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/images/auth_background.svg)',
  },
});