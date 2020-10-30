import { makeStyles } from '@material-ui/core/styles';

const getColorByType = (type, theme) => {
  const colors = {
    info: theme.palette.palette.black,
    danger: theme.palette.palette.red,
    upgrade: theme.palette.palette.black,
  };

  return colors[type] || colors.info;
};

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
  root: ({ type, bgColor }) => ({
    display: 'flex',
    borderRadius: 4,
    position: 'relative',
    flexDirection: 'column',
    padding: '12px 25px 12px 30px',
    boxShadow: '0px 3px 6px #DBE1EDE6',
    backgroundColor: bgColor ? getBgColor(bgColor, theme) : theme.palette.palette.white,
    border: `1px solid ${bgColor ? getBgBorderColor(bgColor, theme) : getColorByType(type, theme)}`,
  }),
  titleContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  icon: ({ type, iconSize }) => ({
    left: -19,
    fontSize: iconSize,
    position: 'absolute',
    color: getColorByType(type, theme),
  }),
  content: {
    marginTop: 8,
  },
}));
