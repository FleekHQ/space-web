import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    width: 166,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
    padding: '9px 0px',
    border: '1px solid #D8D8d8',
  },
  menuItem: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: '3px 0px 3px 15px',
    '&:hover': {
      backgroundColor: theme.palette.palette.gray4,
    },
  },
  iconContainer: {
    width: 21,
    display: 'flex',
    alignContent: 'center',
  },
  icon: {
    fontSize: 11,
    color: '#7F8185',
  },
  displayText: {
    fontSize: 14,
  },
  image: {
    width: 14,
  },
  divider: {
    backgroundColor: theme.palette.palette.gray4,
    margin: '6px 0px',
  },
}));
