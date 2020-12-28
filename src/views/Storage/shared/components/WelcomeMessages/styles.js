import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  rootWelcome: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    left: 10,
    margin: 'auto',
    maxWidth: 559,
    '& > div': {
      margin: '10px 0',
    },
  },
  btnGroup: {
    marginTop: 10,
  },
  btn: {
    height: 21,
    fontSize: 12,
    minWidth: 62,
    padding: '4px 9px',
  },
  messageTitleContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
});
