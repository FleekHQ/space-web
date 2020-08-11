import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  rootHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > svg': {
      fontSize: 11,
      marginRight: 6,
    },
  },
});
