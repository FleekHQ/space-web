import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: 10,
    },
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #dbdbdb',
    borderTopStyle: 'dashed',
    paddingTop: 18,
  },
  input: {
    display: 'none',
  },
});
