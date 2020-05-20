import palette from '../palette/palette';

const MuiOutlinedInput = {
  outlined: {
    color: palette.gray1,
    transform: 'translate(14px, 9px) scale(1)',
    '&$shrink': {
      color: palette.black,
    }
  },
};

export default MuiOutlinedInput;
