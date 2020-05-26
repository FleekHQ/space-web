import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.palette.white,
    '& > *:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.palette.gray4}`,
    }
  },
  trafficLightsSpot: {
    height: 27,
  },
  generalNav: {
    alignItems: 'center',
    backgroundColor: theme.palette.palette.gray5,
    paddingBottom: 11,
  },
  navWrapper: {
    display: 'flex',
    flexGrow: 1,
  },
  navColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  specificNavWrapper: {
    padding: '15px 13px 14px 12px',
    alignItems: 'flex-start',
  },
  specificNavTitle: {
    marginBottom: 14,
  },
  specificNavLink: {
    marginBottom: 10,
    textDecoration: 'none',
  },
  pullDown: {
    marginTop: 'auto',
  },
}));
