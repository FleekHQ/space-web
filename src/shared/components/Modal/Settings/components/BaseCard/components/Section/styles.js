import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: 10,
    },
  },
});
