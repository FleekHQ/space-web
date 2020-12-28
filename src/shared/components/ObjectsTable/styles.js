/* eslint-disable */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative', // to keep table above the rainbow field
    userSelect: 'none',
    width: '100%',
    tableLayout: 'fixed',
  },
  row: {
    cursor: 'pointer',
    '&&&:hover': {
      backgroundColor: '#F5F6F8',
    },
    borderTop: '1px solid #EEF1F6',
    '&:last-child': {
      borderBottom: '1px solid #EEF1F6',
    },
  },
  headerCell: {
    height: 'auto',
  },
  options: {
    fontSize: 18,
    height: '100%',
    padding: '0 5px',
  },
  tableWrapper: {
    flexGrow: 1,
    padding: '6px 0',
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
  filterDirectionIcon: {
    marginLeft: 4,
    fontSize: 10,
  },
  sortButton: {
    padding: 2,
  },
  selected: {
    backgroundColor: '#E5F0FF !important',
  },
  selectedAndUploading: {
    backgroundColor: '#F5F6F8 !important',
  },
  error: {
    backgroundColor: '#F8DEDF !important',
  },
}));
