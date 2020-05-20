import palette from '../palette/palette';

const muiButton = {
  root: {
    padding: '8px 20px',
    whiteSpace: 'nowrap',
  },
  textPrimary: {
    color: palette.black,
  },
  containedPrimary: {
    color: palette.white,
    backgroundColor: palette.black,
  },
  outlinedPrimary: {
    color: palette.black,
    border: `solid 1px ${palette.black}`,
  },
  textSecondary: {
    color: palette.blue1,
  },
  containedSecondary: {
    color: palette.white,
    backgroundColor: palette.blue1,
  },
  outlinedSecondary: {
    color: palette.blue1,
    border: `solid 1px ${palette.blue1}`,
  },
};

export default muiButton;
