import palette from '../palette';

const MuiFilledInput = {
  root: {
    backgroundColor: palette.palette.white,
    boxShadow: palette.shadows.bottom,
    border: `1px solid ${palette.palette.white}`,
    borderRadius: 4,
    transition: 'border-color 0.15s ease',
    '&:hover': {
      backgroundColor: undefined,
    },
    '&$focused': {
      backgroundColor: undefined,
      borderColor: palette.palette.blue1,
    }
  },
  input: {
    height: 'auto',
    padding: '7px 15px 9px',
    '&::placeholder': {
      color: palette.palette.gray1,
      opacity: 1,
    },
  },
  underline: {
    display: 'none',
  },
};

export default MuiFilledInput;
