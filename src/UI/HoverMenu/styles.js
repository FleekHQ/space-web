import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: '4px 6px',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
    border: '1px solid #D8D8d8',
  },
  menuItem: {
    padding: 0,
    height: 22,
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#ECEEF1',
    },
    '&:not(:first-child)': {
      marginLeft: 4,
    },
  },
  iconContainer: {
    padding: 4,
    display: 'flex',
    alignContent: 'center',
  },
  icon: {
    fontSize: 14,
    color: '#7F8185',
  },
  cancelIcon: {
    fontSize: 19,
  },
  tooltipRoot: {
    margin: 0,
    maxWidth: 300,
    padding: '5px 10px',
    color: theme.palette.common.white,
    backgroundColor: '#171717',
    borderRadius: 4,
    top: -5,
  },
  tooltipArrow: {
    color: '#171717',
  },
}));
