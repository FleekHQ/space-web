import { makeStyles } from '@material-ui/core/styles';

export const rowHeight = 36;
export const headHeight = 39;

const RAINBOW_BORDER_WIDTH = 2;

export default makeStyles({
  root: {
    display: 'flex',
    position: 'relative', // to set boundaries for rainbow field during drag'n'drop
    minHeight: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  wrapper: {
    minHeight: '100%',
  },
  rainbowField: {
    position: 'absolute',
    background: 'linear-gradient(134deg, #ed55eb 18%, #17e0d8 42%, #00ffc2 59%, #ffec06 81%)',
    backgroundRepeat: 'no-repeat',
    borderRadius: 6,
    top: headHeight - 2 * RAINBOW_BORDER_WIDTH,
    right: -RAINBOW_BORDER_WIDTH,
    bottom: -RAINBOW_BORDER_WIDTH,
    left: -RAINBOW_BORDER_WIDTH,
    padding: RAINBOW_BORDER_WIDTH,
    transition: 'top ease .17s, bottom ease .17s',
    '&:before': {
      content: '""',
      display: 'block',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 4,
    },
  },
});
