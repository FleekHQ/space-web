import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  const themes = [
    {
      border: theme.palette.palette.blue4,
      color1: theme.palette.palette.blue1,
      color2: theme.palette.palette.blue3,
    },
    {
      border: theme.palette.palette.green3,
      color1: theme.palette.palette.green2,
      color2: theme.palette.palette.green4,
    },
  ];

  const getTheme = (props) => themes[props.themeIndex];

  return ({
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    titleText: {
      fontSize: 12,
      color: theme.palette.palette.black,
    },
    usingText: {
      color: theme.palette.palette.gray1,
      fontSize: 12,
    },
    chartBar: {
      height: 19,
    },
    bar1: {
      display: 'inline-block',
      border: (props) => `solid 1px ${getTheme(props).border}`,
      width: (props) => `calc(${Math.max(1, props.firstBarWidth)}% - 1px)`,
      backgroundColor: (props) => getTheme(props).color1,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
    },
    bar2: {
      display: 'inline-block',
      borderTop: (props) => `solid 1px ${getTheme(props).border}`,
      borderBottom: (props) => `solid 1px ${getTheme(props).border}`,
      borderRight: (props) => `solid 1px ${getTheme(props).border}`,
      width: (props) => `calc(${Math.min(99, 100 - props.firstBarWidth)}% - 1px)`,
      backgroundColor: (props) => getTheme(props).color2,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
    },
    legendContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 12,
    },
    legendItem: {
      marginRight: 20,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    barText: {
      color: theme.palette.palette.gray1,
      fontSize: 10,
    },
    box: {
      marginRight: 3,
      borderRadius: 3,
      width: 13,
      height: 13,
    },
    firstBox: {
      backgroundColor: (props) => getTheme(props).color1,
      border: (props) => `solid 1px ${getTheme(props).border}`,

    },
    secondBox: {
      backgroundColor: (props) => getTheme(props).color2,
      border: (props) => `solid 1px ${getTheme(props).border}`,
    },
    disabled: {
      border: `1px solid ${theme.palette.palette.gray14}`,
      borderRadius: 3,
    },
  });
});
