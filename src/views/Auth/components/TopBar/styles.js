import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarRoot: {
    paddingTop: 22,
    backgroundColor: '#151515',
  },
  authBtnRoot: {
    width: 79,
    fontWeight: 600,
    padding: '10px 14px',
    color: theme.palette.common.white,
  },
  rainbowBg: {
    color: theme.palette.common.black,
    background: 'transparent linear-gradient(105deg, #ED55EB 0%, #17E0D8 37%, #00FFC2 60%, #FFEC06 100%) 0% 0% no-repeat padding-box',
  },
  iconBtnRoot: {
    width: 21,
    height: 24,
    padding: 0,
    '& svg': {
      width: 21,
      height: 24,
    },
  },
  logoLink: {
    display: 'flex',
  },
}));