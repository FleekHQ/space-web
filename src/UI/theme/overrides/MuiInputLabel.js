import palette from '../palette/palette';

const MuiOutlinedInput = {
  outlined: {
    color: palette.secondary,
    transform: 'translate(14px, 9px) scale(1)',
    '&$shrink': {
      color: palette.primary,
    }
  },
};

export default MuiOutlinedInput;
