import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    padding: 22,
    '& > p:not(:last-child)': {
      marginBottom: 8,
    },
    '& > p:first-child': {
      marginBottom: 14,
    },
  },
  icon: {
    marginRight: 4,
  },
});
