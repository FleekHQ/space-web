import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  rootWelcome: {
    padding: '0 21px 12px 17px',
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
