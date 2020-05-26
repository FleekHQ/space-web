import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    height: 35,
    fontSize: 14,
    borderBottom: 'none',
    alignItems: 'center',
    '&$head': {
      fontWeight: 'normal',
    },
  },
  head: {},
});
