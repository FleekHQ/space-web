import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'relative', // to keep table above the rainbow field
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
    fontSize: 18,
    height: '100%',
    padding: '0 5px',
  },
  selected: {
    backgroundColor: `${theme.palette.palette.white} !important`,
  },
  tableWrapper: {
    flexGrow: 1,
    padding: 6,
    minHeight: 0,
    overflow: 'auto',
  },
  errorCardContainer: {
    position: 'absolute',
    bottom: 12,
    // The margins of the table container must be substracted
    // 6px * 2 = 12px
    width: 'calc(100% - 12px)',
  },
}));
