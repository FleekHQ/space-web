import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  const getConfig = (isDark = false) => {
    if (isDark) {
      return ({
        background: theme.palette.palette.spaceBlack,
        border: theme.palette.palette.gray19,
        label: theme.palette.palette.gray2,
        inputText: theme.palette.palette.white,
        inputTextWeight: 'auto',
      });
    }
    return ({
      background: theme.palette.palette.white,
      border: theme.palette.palette.gray2,
      label: theme.palette.palette.black,
      inputText: theme.palette.palette.black,
      inputTextWeight: 600,
    });
  };

  return ({
    lessMargin: {
      margin: '-1px',
    },
    root: {
      '& .MuiInputLabel-shrink': {
        top: '-3px !important',
      },
      '& > div': {
        height: 41,
        padding: 0,
      },
      '& textarea:first-child': {
        padding: '10px 32px 10px 16px',
      },
      '& textarea + fieldset': {
        borderWidth: '0 !important',
      },
      '& textarea:invalid + fieldset': {
        borderWidth: '0 !important',
      },
      '& textarea:valid:focus + fieldset': {
        borderWidth: '0 !important',
      },
      '& fieldset': {
        borderWidth: '0px !important',
      },
      '& input, textarea': {
        fontFamily: 'Inter',
        fontWeight: ({ isDark }) => getConfig(isDark).inputTextWeight,
        color: ({ isDark }) => getConfig(isDark).inputText,
        paddingRight: ({ endAdornment }) => (endAdornment ? 25 : 'auto'),
      },
    },
    label: {
      '&$label': {
        backgroundColor: ({ isDark }) => getConfig(isDark).background,
        padding: '0 2px',
        color: ({ isDark }) => getConfig(isDark).label,
        top: 3,
      },
    },
    erroredLabel: {},
    field: {
      // Field below defines the color of the text cursor
      color: ({ isDark }) => getConfig(isDark).inputText,
      backgroundColor: ({ isDark }) => getConfig(isDark).background,
      borderRadius: 2,
    },
    errorContainer: {
      marginTop: 7,
      display: 'flex',
      alignItems: 'center',
    },
    errorIcon: {
      color: theme.palette.palette.red,
      fontSize: 12,
      display: 'inline-block',
      marginRight: 3,
    },
    errorText: {
      color: theme.palette.palette.red,
      fontSize: 12,
      display: 'inline-block',
    },
    rainbow: {
      /* eslint-disable-next-line max-len */
      background: `linear-gradient(96deg, ${theme.palette.palette.spacePink} 0%, ${theme.palette.palette.spaceTeal} 37%, ${theme.palette.palette.spaceGreen} 64%, ${theme.palette.palette.spaceYellow} 100%)`,
      boxShadow: 'none',
      padding: 2,
      borderRadius: 2,
    },
    inactive: {
      border: ({ isDark }) => `1px solid ${getConfig(isDark).border}`,
      borderRadius: 2,
    },
    dimRainbow: {
      /* eslint-disable-next-line max-len */
      background: `linear-gradient(96deg, ${theme.palette.palette.spacePink}4D 0%, ${theme.palette.palette.spaceTeal}4D 37%, ${theme.palette.palette.spaceGreen}4D 64%, ${theme.palette.palette.spaceYellow}4D 100%)`,
      boxShadow: 'none',
      padding: 2,
      borderRadius: 2,
    },
    error: {
      '& input, textarea': {
        border: `1px solid ${theme.palette.palette.red}`,
        borderRadius: 2,
      },
    },
  });
});
