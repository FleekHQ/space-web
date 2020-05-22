import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& th:first-child': {
      paddingLeft: 12,
    },
    '& th:last-child': {
      paddingRight: 12,
    },
    '& td:first-child': {
      paddingLeft: 12,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    '& td:last-child': {
      paddingRight: 12,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    '&$hover:hover': {
      borderRadius: 4,
      backgroundColor: theme.palette.palette.white,
    },
  },
  hover: {},
}));
