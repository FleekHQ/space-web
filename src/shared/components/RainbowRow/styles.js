import { makeStyles } from '@material-ui/core/styles';

export const rowHeight = 36;
export const headHeight = 27;

export default makeStyles(() => ({
  rainbowBox: {
    overflow: 'visible',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    opacity: 0.1,
    zIndex: 1,
    '& + &': {
      zIndex: 1,
      opacity: 1,
    },
  },
}));
