import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: 22,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    '& > *:not(:last-child)': {
      marginBottom: 18,
    },
    '& > *:first-child': {
      marginBottom: 14,
    },
  },
  icon: {
    marginRight: 4,
  },
  paymentType: {
    display: 'flex',
    '& > button': {
      color: theme.palette.palette.blue1,
      marginLeft: 10,
    },
  },
}));
