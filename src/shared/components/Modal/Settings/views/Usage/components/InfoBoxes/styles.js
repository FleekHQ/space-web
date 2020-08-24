import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '12px 12px 15px',
    color: ({ warning }) => (warning
      ? theme.palette.palette.red
      : theme.palette.palette.black
    ),
    border: '1px solid currentColor',
    borderRadius: 4,
    marginTop: 17,
  },
  message: {
    padding: '8px 0 11px',
  },
  circleArrowIcon: {
    fontSize: 14,
    color: 'inherit',
    marginRight: 5,
  },
  longArrowIcon: {
    position: 'relative',
    top: 1,
    fontSize: 14,
    marginRight: 5,
  },
  buttonsList: {
    display: 'flex',
  },
}));
