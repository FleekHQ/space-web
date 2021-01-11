import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    padding: '15px 0px',
  },
  dataRow: {
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
});
