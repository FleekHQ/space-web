import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '6px 0',
  },
  header: {
    display: 'flex',
    padding: '0 18px',
  },
  forwardButton: {
    margin: '0 18px 0 8px',
  },
  title: {
    margin: '11px 18px 1px',
  },
  tableWrapper: {
    padding: 6,
  },
  searchField: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.palette.gray1,
  },
}));
