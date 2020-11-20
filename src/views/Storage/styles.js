import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  viewContent: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  welcome: {
    padding: '0 21px 12px 17px',
    '& > div': {
      margin: '10px 0',
    },
  },
  btn: {
    height: 21,
    fontSize: 12,
    padding: '4px 9px',
  },
});
