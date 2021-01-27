import { makeStyles } from '@material-ui/core/styles';

const getBorderColor = ({ isDark }) => {
  if (isDark) {
    return '#212121';
  }
  return '#D8D8D8';
};

const getBackgroundColor = ({ isDark, theme }) => {
  if (isDark) {
    return '#101010';
  }
  return theme.palette.palette.white;
};

const getIconColor = ({ isDark, theme }) => {
  if (isDark) {
    return '#7F8185';
  }
  return theme.palette.palette.gray1;
};

const getDividerColor = ({ isDark, theme }) => {
  if (isDark) {
    return '#212121';
  }
  return theme.palette.palette.gray4;
};

const getTextColor = ({ isDark, theme }) => {
  if (isDark) {
    return theme.palette.palette.white;
  }
  return theme.palette.palette.black;
};

const getHoverColor = ({ isDark, theme }) => {
  if (isDark) {
    return '#212121';
  }
  return theme.palette.palette.gray4;
};

export default makeStyles((theme) => ({
  paper: {
    backgroundColor: ({ isDark }) => getBackgroundColor({ isDark, theme }),
    width: 166,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
    padding: '9px 0px',
    border: ({ isDark }) => `1px solid ${getBorderColor({ isDark })}`,
  },
  menuItem: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: '3px 0px 3px 15px',
    '&:hover': {
      backgroundColor: ({ isDark }) => getHoverColor({ isDark, theme }),
    },
  },
  iconContainer: {
    width: 21,
    display: 'flex',
    alignContent: 'center',
  },
  icon: {
    fontSize: 11,
    color: ({ isDark }) => getIconColor({ isDark, theme }),
  },
  displayText: {
    fontSize: 14,
    color: ({ isDark }) => getTextColor({ isDark, theme }),
  },
  image: {
    width: 14,
  },
  divider: {
    backgroundColor: ({ isDark }) => getDividerColor({ isDark, theme }),
    margin: '6px 0px',
  },
}));
