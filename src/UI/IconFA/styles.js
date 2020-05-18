import createTerminalTheme from '@ui/theme';

const theme = createTerminalTheme();

const styles = {
  iconContainer: {
    display: 'flex',
    color: 'inherit',
    fontSize: 24,
    /**
     * NOTE: Font sizes should follow Terminal default icon sizes. Inherit if needed.
     * Terminal currently following https://material-ui.com/api/icon/#props font sizes
     */
    '&.font-size--inherit': {
      // NOTE: Alows for custom sizing based on the parent
      fontSize: 'inherit',
    },
    '&.font-size--small': {
      fontSize: 20,
    },
    '&.font-size--large': {
      fontSize: 35,
    },
    '&.font-size--veryLarge': {
      fontSize: 35,
    },
    '&.color--inherit': {
      // NOTE: Alows for custom color based on the parent
      color: 'inherit',
    },
    '&.color--primary': {
      color: theme.palette.primary.main,
    },
    '&.color--secondary': {
      color: theme.palette.secondary.dark,
    },
    '&.color--black': {
      color: theme.palette.common.black,
    },
    '&.color--dark': {
      color: theme.palette.grey['900'],
    },
    '&.color--gray': {
      color: theme.palette.palette.brownishGrey,
    },
    '&.color--red': {
      color: theme.palette.palette.errorRed,
    },
  },
  fontAwesomeOverrides: {
    '&.font-size--reset': {
      /**
       * NOTE: Font-awesome sets the svg width to 1.25,
       * which throws off the above font-size calculations. Reset it to 100%.
       */
      width: '1em',
    },
  },
  topbarDocs: {
    marginBottom: 0,
    height: 20,
    width: 18,
  },
  ganacheV2: {
    '& > *': {
      stroke: theme.palette.palette.brownishGrey,
    },
  },
};

export default styles;
