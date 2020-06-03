import { makeStyles } from '@material-ui/core/styles';

import { stringToColor } from '@utils';

export default makeStyles((theme) => ({
  root: {
    paddingTop: 35,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.palette.white,
  },
  trafficLightsSpot: {
    height: 34,
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
  avatar: {
    width: 38,
    height: 38,
    backgroundColor: ({ user }) => (stringToColor(user.username)),
    color: ({ user }) => {
      const color = stringToColor(user.username);

      return theme.palette.getContrastText(color);
    },
  },
}));
