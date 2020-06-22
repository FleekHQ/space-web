import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  accessContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 12,
  },
  title: {
    marginBottom: 12,
  },
});
