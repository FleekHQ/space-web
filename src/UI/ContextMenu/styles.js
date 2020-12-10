import { makeStyles } from '@material-ui/core/styles';

const getOuterBorder = () => ('1px solid #D8D8d8');
const getInnerBorder = (theme) => (`1px solid ${theme.palette.palette.gray4}`);

export default makeStyles((theme) => ({
  paper: {
    width: 165,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
  },
  menuItem: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: '11px 0px 11px 15px',
    borderRight: getOuterBorder(theme),
    borderLeft: getOuterBorder(theme),
    borderBottom: getInnerBorder(theme),
    '&:first-child': {
      borderTop: getOuterBorder(theme),
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    '&:last-child': {
      borderBottom: getOuterBorder(theme),
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
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
}));
