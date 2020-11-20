import { makeStyles } from '@material-ui/core/styles';

const getBgColor = (bgColor, theme) => {
  const colors = {
    primary: '#D3E4FD',
    secondary: theme.palette.palette.white,
  };

  return colors[bgColor] || colors.primary;
};

const getBgBorderColor = (bgColor, theme) => {
  const colors = {
    primary: theme.palette.palette.blue1,
    secondary: theme.palette.palette.gray4,
  };

  return colors[bgColor] || colors.primary;
};

export default makeStyles((theme) => ({
  root: ({ bgColor, isRainbow }) => ({
    display: 'flex',
    borderRadius: 4,
    position: 'relative',
    flexDirection: 'column',
    padding: '12px 25px 12px 30px',
    backgroundColor: bgColor ? getBgColor(bgColor, theme) : theme.palette.palette.white,
    ...(!isRainbow && { boxShadow: '0px 3px 6px #DBE1EDE6' }),
    ...(!isRainbow && { border: `1px solid ${bgColor ? getBgBorderColor(bgColor, theme) : theme.palette.palette.black}` }),
  }),
  titleContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  icon: ({ iconSize, iconColor }) => ({
    left: -19,
    fontSize: iconSize,
    position: 'absolute',
    color: iconColor || theme.palette.palette.black,
  }),
  content: {
    marginTop: 8,
  },
  accentWrapper: {
    padding: 3,
    borderRadius: 4,
    background: `linear-gradient(134deg, ${theme.palette.palette.spacePink} 18%, ${theme.palette.palette.spaceTeal} 42%, ${theme.palette.palette.spaceGreen} 59%, ${theme.palette.palette.spaceYellow} 81%)`,
    boxShadow: 'none',
  },
}));
