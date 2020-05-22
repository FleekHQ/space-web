import palette from '../palette/palette';

const muiButton = {
  root: {
    padding: '8px 20px',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    minWidth: undefined,
    transition: 'opacity ease 0.2s',
    '&:hover': {
      opacity: 0.75,
      backgroundColor: undefined,
    },
  },
  text: {
    color: palette.black,
    padding: undefined,
  },
  contained: {
    color: palette.white,
    backgroundColor: palette.black,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '&:hover': {
      backgroundColor: undefined,
    },
    '&$disabled': {
      backgroundColor: palette.gray7,
      color: palette.gray6,
    },
  },
  outlined: {
    color: palette.black,
    padding: undefined,
    '&&, &&:hover': {
      border: 'solid 1px currentColor',
      backgroundColor: 'transparent',
    },
  },
  textPrimary: {
    color: palette.blue1,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  containedPrimary: {
    color: palette.white,
    backgroundColor: palette.blue1,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  outlinedPrimary: {
    color: palette.blue1,
  },
  textSecondary: {
    color: palette.gray1,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  containedSecondary: {
    color: palette.white,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  outlinedSecondary: {
    color: palette.gray1,
    '&&, &&:hover': {
      border: `solid 1px ${palette.gray2}`,
    },
  },
};

export default muiButton;
