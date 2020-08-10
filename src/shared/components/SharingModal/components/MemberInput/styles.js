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
    fontSize: 10,
  },
  chip: {
    height: 20,
    borderRadius: 0,
    backgroundColor: '#f6f6f6',
    // TODO: uncomment once fe-theme is updated
    // backgroundcolor: theme.palette.palette.grey7,
  },
  chipLabel: {
    paddingLeft: 5,
  },
}));
