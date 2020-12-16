import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  forwardButton: {
    margin: '0 18px 0 8px',
  },
  icon: {
    color: theme.palette.palette.gray1,
  },
  resultContainer: {
    maxHeight: 320,
    overflow: 'auto',
  },
  rootSearchBar: {
    display: 'flex',
    flex: '0 1 458px',
    zIndex: 1,
  },
  noResults: {
    padding: '13px 0 16px',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
}));
