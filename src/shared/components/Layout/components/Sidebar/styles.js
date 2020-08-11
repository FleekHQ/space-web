import { makeStyles } from '@material-ui/core/styles';

export const SIDEBAR_WIDTH = 220;

export default makeStyles((theme) => ({
  rootSidebar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.palette.white,
    flex: `0 0 ${SIDEBAR_WIDTH}px`,
  },
  trafficLightsSpot: {
    height: 34,
  },
  sidebarContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  accounts: {
    width: 52,
    display: 'flex',
    paddingTop: 5,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.palette.white,
    borderTop: `1px solid ${theme.palette.palette.gray4}`,
    borderRight: `1px solid ${theme.palette.palette.gray4}`,
    '& > div': {
      margin: '5px 0',
    },
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
