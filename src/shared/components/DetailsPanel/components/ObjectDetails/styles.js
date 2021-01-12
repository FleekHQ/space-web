import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '../../constants';

export default makeStyles((theme) => ({
  root: {
    padding: '15px 0px',
  },
  dataRow: {
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  label: {
    color: ({ viewMode }) => (viewMode !== VIEW_MODES.PREVIEW ? theme.palette.palette.gray1 : '#7F8185'),
  },
  value: {
    color: ({ viewMode }) => (viewMode !== VIEW_MODES.LIGHT && theme.palette.palette.white),
  },
}));
