import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: 12,
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ownerLabel: {
    display: 'flex',
    alignItems: 'center',
  },
});
