import palette from '../palette/palette';

const muiButton = {
  root: {
    padding: '8px 20px',
    whiteSpace: 'nowrap',
  },
  textPrimary: {
    color: palette.primary,
  },
  containedPrimary: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.primary,
  },
  outlinedPrimary: {
    color: palette.primary,
    border: `solid 1px ${palette.primary}`,
  },
  textSecondary: {
    color: palette.accent,
  },
  containedSecondary: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.accent,
  },
  outlinedSecondary: {
    color: palette.accent,
    border: `solid 1px ${palette.accent}`,
  },
};

export default muiButton;
