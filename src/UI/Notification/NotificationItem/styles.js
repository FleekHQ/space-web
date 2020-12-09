import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  highlighted: {
    backgroundColor: 'rgba(0, 110, 255, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(0, 110, 255, 0.05)',
    },
  },
  button: {
    fontSize: 12,
    height: 26,
    width: 57,
    padding: 0,
    boxSizing: 'border-box',
  },
  filesContainer: {
    marginLeft: (props) => 3 * (props.stackedItems - 1),
    margin: '6px 0',
    '& > *:not(:last-child)': {
      marginBottom: 5,
    },
  },
  filesStack: {
    position: 'relative',
  },
  buttonContainer: {
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: 5,
    },
  },
  content: {
    flex: 1,
    marginLeft: 8,
    maxWidth: 220,
  },
  statusChip: {
    fontSize: 12,
    borderRadius: 3,
    padding: '6px 10px',
    display: 'inline-block',
  },
  accepted: {
    color: theme.palette.palette.green2,
    backgroundColor: `${theme.palette.palette.green2}25`,
  },
  rejected: {
    color: theme.palette.palette.red,
    backgroundColor: `${theme.palette.palette.red}5c`,
  },
  timestamp: {
    marginTop: (props) => (20 + 3 * (props.stackedItems - 1)),
    marginBottom: 6,
  },
}));
