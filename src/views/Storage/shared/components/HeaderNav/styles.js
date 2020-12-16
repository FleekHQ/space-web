import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  resultContainer: {
    zIndex: 10,
    maxHeight: 320,
    overflow: 'auto',
  },
  rootSearchBar: {
    display: 'flex',
    flex: 1,
  },
  noResults: {
    display: 'flex',
    padding: '8px 5px',
    justifyContent: 'center',
  },
}));
