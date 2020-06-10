import palette from '../palette/palette';

const MuiOutlinedInput = {
  input: {
    height: 'auto',
    padding: '8px 15px 10px',
  },
  notchedOutline: {
    borderColor: palette.gray2,
    '$root$focused &': {
      borderWidth: 1,
    },
  },
};

export default MuiOutlinedInput;
