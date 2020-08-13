import { makeStyles } from '@material-ui/styles';

import { TYPES, BG_COLORS } from './constants';

const getColor = (theme) => ({ type, bgColor }) => {
  if (type === TYPES.danger) {
    return theme.palette.palette.red;
  }
  if (bgColor === BG_COLORS.secondary) {
    return theme.palette.common.white;
  }
  return theme.palette.common.black;
};

export const useCustomToolTipStyles = makeStyles((theme) => ({
  arrow: {
    fontSize: '1.7em',
    color: getColor(theme),
  },
  tooltip: ({ type, bgColor }) => {
    let color = theme.palette.common.black;
    let borderColor = theme.palette.common.black;
    let backgroundColor = theme.palette.common.white;

    if (bgColor === BG_COLORS.secondary) {
      color = theme.palette.common.white;
      borderColor = theme.palette.palette.white;
      backgroundColor = theme.palette.common.black;
    }

    if (type === TYPES.danger) {
      borderColor = theme.palette.palette.red;
    }

    return {
      color,
      backgroundColor,
      left: -7,
      borderRadius: 4,
      padding: '14px 22px 14px 11px',
      border: `1px solid ${borderColor}`,
    };
  },
}));

export default makeStyles((theme) => ({
  tooltipContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > svg': {
      fontSize: 11,
      marginRight: 6,
      color: getColor(theme),
    },
  },
  requirementList: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft: 15,
    margin: '-4px 0',
  },
}));
