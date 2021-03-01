import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '0 17px',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F2F3F7',
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
    flex: 1,
    zIndex: 1,
    display: 'flex',
    padding: '5px 0',
  },
  noResults: {
    padding: '13px 0 16px',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  iconBtnsContainer: {
    display: 'flex',
    '& > button': {
      margin: '0 7px',
      fontSize: 16,
      color: '#666666',
    },
  },
  hide: {
    visibility: 'hidden',
  },
  beta: {
    fontSize: 8,
    marginLeft: 5,
    fontWeight: 600,
    marginBottom: 2,
  },
}));
