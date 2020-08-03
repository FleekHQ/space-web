import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
}));
