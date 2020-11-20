import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    height: 28,
    width: '100%',
  },
  button: {
    height: 28,
    fontSize: 12,
    padding: '0 11px',
    marginLeft: 5,
    minWidth: 100,
  },
  checkedButton: {
    backgroundColor: `${theme.palette.palette.green2} !important`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: `${theme.palette.palette.green2}EE !important`,
    },
  },
  iconCheck: {
    color: theme.palette.palette.white,
    fontSize: 15,
    marginRight: 3,
  },
  copiedText: {
    color: theme.palette.palette.white,
    fontSize: 12,
  },
}));
