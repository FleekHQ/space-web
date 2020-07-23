import { makeStyles } from '@material-ui/core/styles';

export const HORIZONTAL_PADDING = 22;

export default makeStyles({
  root: {
    padding: `13px ${HORIZONTAL_PADDING}px 18px`,
  },
  fileIconWrapper: {
    margin: '15px auto',
    position: 'relative',
    height: 120,
  },
  buttonsGroup: {
    display: 'flex',
    '& > *:not(:first-child)': {
      marginLeft: 7,
    },
  },
  openBtn: {
    minWidth: 120,
  },
  menuBtn: {
    fontSize: 18,
    padding: 6,
    flexGrow: 1,
  },
  title: {
    margin: '15px 0',
  },
  arrowIcon: {
    fontSize: 11,
    marginTop: 1,
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    filter: 'drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.12))',
  },
  centerIcon: {
    margin: 'auto',
  },
});
