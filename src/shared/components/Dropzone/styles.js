import { makeStyles } from '@material-ui/core/styles';

export const rowHeight = 35;
export const headHeight = 27;

export default makeStyles({
  root: {
    position: 'relative', // to set boundaries for rainbow field during drag'n'drop
    '&:focus': {
      outline: 'none',
    },
  },
  rainbowField: {
    position: 'absolute',
    background: 'linear-gradient(134deg, #ed55eb 18%, #17e0d8 42%, #00ffc2 59%, #ffec06 81%)',
    backgroundRepeat: 'no-repeat',
    borderRadius: 6,
    top: headHeight - 3,
    right: 0,
    bottom: 0,
    left: 2,
    padding: 3,
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
