import { makeStyles } from '@material-ui/core/styles';

const getBorder = () => ('1px solid #D8D8d8');

export default makeStyles((theme) => ({
  paper: {
    width: 'fit-content',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    height: 32,
  },
  menuItem: {
    width: 32,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderBottom: getBorder(theme),
    borderTop: getBorder(theme),
    '&:first-child': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      borderLeft: getBorder(theme),
    },
    '&:last-child': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      borderRight: getBorder(theme),
    },
  },
  iconContainer: {
    width: 21,
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
