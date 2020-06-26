import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
    fontSize: 18,
    height: '100%',
    padding: '0 5px',
  },
  dropzone: {
    minHeight: '100%',
    borderRadius: 4,
    border: '2px solid transparent',
  },
  dropzoneActive: {
    borderColor: theme.palette.palette.blue1,
  },
  selected: {
    backgroundColor: `${theme.palette.palette.white} !important`,
  },
  tableWrapper: {
    flexGrow: 1,
    padding: 6,
  },
}));
