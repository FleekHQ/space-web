import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.palette.white,
  },
  title: {
    margin: '15px 0 10px',
    fontSize: 24,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  callToAction: {
    color: '#858585',
    margin: '13px 0',
  },
  callToActionBtn: {
    color: theme.palette.palette.white,
    padding: 0,
    marginTop: -1,
    fontSize: 'inherit',
    textDecoration: 'underline',
  },
  resetLinkStyle: {
    textDecoration: 'none',
  },
  message: {
    whiteSpace: 'pre',
    textAlign: 'center',
    lineHeight: '20px',
  },
}));
