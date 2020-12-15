import { makeStyles } from '@material-ui/core/styles';

export const listStyles = makeStyles(() => ({
  root: {
    color: 'black',
    minWidth: 178,
    border: '1px solid #D8D8D8',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: 6,
  },
  padding: {
    padding: '5px 0',
  },
}));

export const itemStyles = makeStyles(() => ({
  root: {
    padding: '6px 13px',
  },
}));

export const useStyles = makeStyles((theme) => ({
  iconContainer: {
    width: 15,
    marginRight: 9,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
  },
  icon: {
    fontSize: 14,
    color: theme.palette.icons.babyBlue,
  },
}));
