import { makeStyles } from '@material-ui/core/styles';

const getColorByType = (type, theme) => {
  const colors = {
    info: theme.palette.palette.black,
    danger: theme.palette.palette.red,
    upgrade: theme.palette.palette.black,
  };

  return colors[type] || colors.info;
};

const getBgColor = (bgColor) => {
  const colors = {
    primary: '#ffeeb7',
    secondary: 'rgba(0, 110, 255, 0.15)',
  };

  return colors[bgColor] || colors.primary;
};

const getBgBorderColor = (bgColor, theme) => {
  const colors = {
    primary: '#de8901',
    secondary: theme.palette.palette.blue1,
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
    backgroundColor: bgColor ? getBgColor(bgColor) : theme.palette.palette.white,
    border: `1px solid ${bgColor ? getBgBorderColor(bgColor, theme) : getColorByType(type, theme)}`,
  }),
  titleContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  icon: ({ type }) => ({
    left: -19,
    fontSize: 14,
    position: 'absolute',
    color: getColorByType(type, theme),
  }),
  content: {
    marginTop: 8,
  },
}));
