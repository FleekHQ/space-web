import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '../../constants';

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    overflow: 'auto',
    display: 'inherit',
    flexDirection: 'inherit',
    maxHeight: ({ listMaxHeight }) => (listMaxHeight === 0 ? '100%' : listMaxHeight),
  },
  user: {
    height: 21,
    margin: '3px 0',
    display: 'inherit',
    flexDirection: 'row',
    alignItems: 'center',
    '& > p': {
      marginLeft: 5,
    },
  },
  avatar: {
    fontSize: '1rem',
  },
  greyBG: {
    backgroundColor: theme.palette.palette.gray10,
    '& > svg': {
      height: 9,
      color: theme.palette.palette.gray1,
    },
  },
  ownerLabel: {
    color: ({ viewMode }) => (viewMode !== VIEW_MODES.PREVIEW ? theme.palette.palette.gray1 : '#7F8185'),
    '&&&': {
      marginLeft: 8,
    },
  },
}));
