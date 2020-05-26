import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    userSelect: 'none',
    width: '100%',
    tableLayout: 'fixed',
  },
  row: {
    cursor: 'pointer',
  },
  headerCell: {
    paddingTop: 6,
    height: 'auto',
    paddingBottom: 6,
  },
  options: {
    fontSize: 8,
    height: '100%',
  },
});
