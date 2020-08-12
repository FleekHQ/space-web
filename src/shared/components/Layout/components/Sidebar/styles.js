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
  contentSidebar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  leftPanel: {
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
  rightPanel: {
    flex: 1,
    width: 163,
    display: 'flex',
    flexDirection: 'column',
  },
  userContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: '11px 15px 11px 13px',
    borderTop: `1px solid ${theme.palette.palette.gray4}`,
  },
  rootDivider: {
    backgroundColor: `${theme.palette.palette.gray4} !important`,
  },
  navMenu: {
    margin: 0,
    padding: '3px 13px 0 13px',
    listStyleType: 'none',
    '& > li': {
      margin: '10px 0',
    },
  },
  specificNavLink: {
    textDecoration: 'none',
  },
}));
