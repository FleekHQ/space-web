import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
    minWidth: 13,
  },
  boxActive: {
    backgroundColor: (props) => props.color,
    border: (props) => `solid 1px ${props.borderColor}`,
  },
  disabled: {
    border: `1px solid ${theme.palette.palette.gray14}`,
    borderRadius: 3,
  },
}));
