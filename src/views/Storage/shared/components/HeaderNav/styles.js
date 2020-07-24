import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '0 18px',
  },
  forwardButton: {
    margin: '0 18px 0 8px',
  },
  searchField: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.palette.gray1,
  },
}));
