/* eslint-disable quotes */
import { makeStyles } from '@material-ui/core/styles';

export const rowHeight = 36;
export const headHeight = 39;

export default makeStyles({
  root: {
    display: 'flex',
    minHeight: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  wrapper: {
    position: 'relative',
    minHeight: '100%',
  },
  rainbowField: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    opacity: 0.1,
    '& + &': {
      zIndex: 1,
      opacity: 1,
    },
  },
});
