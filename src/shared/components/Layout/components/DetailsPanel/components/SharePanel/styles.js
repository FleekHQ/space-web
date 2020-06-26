import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 22px 0 22px',
    '& > button': {
      margin: '5px 0',
    },
    '& > button:first-child': {
      marginTop: 0,
    },
  },
  shareWidth: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5px 0 10px 0',
  },
  collaboratorList: {
    flex: 1,
  },
});
