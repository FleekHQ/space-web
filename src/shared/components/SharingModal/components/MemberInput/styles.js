import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  autocomplete: {
    margin: '0 18px',
    '&&&  div': {
      paddingRight: 0,
    },
  },
  option: {
    '&&& p': {
      textOverflow: 'ellipsis',
      display: 'inline-block',
      overflow: 'hidden',
      width: 215,
    },
  },
  permissionDropdown: {
    minWidth: 70,
  },
  chipIcon: {
    color: theme.palette.palette.black,
  },
  chip: {
    height: 20,
    borderRadius: 0,
    backgroundcolor: theme.palette.palette.grey5,
  },
  chipLabel: {
    paddingLeft: 5,
  },
}));
