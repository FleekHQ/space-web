import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  container: {
    display: 'flex',
    padding: 7,
    alignItems: 'center',
    borderRadius: 3,
    border: '1px solid #f1f1f1',
    width: 'fit-content',
    maxWidth: 220,
    backgroundColor: theme.palette.palette.white,
    position: 'absolute',
    top: (props) => props.stackPosition * 3,
    left: (props) => props.stackPosition * -3,
  },
  iconContainer: {
    width: 18,
    height: 18,
    marginRight: 5,
    display: 'flex',
  },
  badgeRoot: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    cursor: 'pointer',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.palette.black}`,
    backgroundColor: theme.palette.palette.white,
    padding: 0,
    top: '-4px',
    right: '-4px',
  },
  badgeContent: {
    fontSize: 11,
  },
}));
