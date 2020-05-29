import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    textTransform: 'none',
    padding: 4,
  },
  text: {
    fontSize: 14,
    color: theme.palette.palette.white,
    paddingLeft: 8,
  },
  plusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.palette.palette.blue2} !important`,
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 12,
    '&& svg': {
      height: 14,
      width: 14,
    },
  },
  popover: {
    boxShadow: 'none',
    '&:after': {
      content: '""',
      margin: '0 auto 5px',
      display: 'block',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: `10px solid ${theme.palette.palette.gray5}`,
      width: 0,
      height: 0,
    },
  },
}));
