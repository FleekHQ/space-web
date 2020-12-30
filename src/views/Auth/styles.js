import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 56px)',
    },
  },
}));
