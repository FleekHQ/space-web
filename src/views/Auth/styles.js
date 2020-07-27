import { makeStyles } from '@material-ui/styles';

const { PUBLIC_URL } = process.env;

export default makeStyles({
  root: {
    padding: '28px 0',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: `url(${PUBLIC_URL}/assets/images/auth_background.svg)`,
    '& > img': {
      marginBottom: 10,
    },
  },
  viewContent: {
    flex: 1,
  },
  logoContent: {
    flex: 1,
    marginBottom: 10,
    display: 'inherit',
    flexDirection: 'inherit',
    justifyContent: 'flex-end',
  },
});
