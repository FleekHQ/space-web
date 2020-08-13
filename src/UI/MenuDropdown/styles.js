import { makeStyles } from '@material-ui/core/styles';

export const listStyles = makeStyles(() => ({
  root: {
    color: 'black',
    minWidth: 138,
  },
  padding: {
    padding: '5px 0',
  },
}));

export const itemStyles = makeStyles(() => ({
  root: {
    padding: '6px 13px',
    '& > svg': {
      marginRight: 5,
    },
  },
}));
