import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chartBar: {
    height: 19,
    display: 'inline-block',
    border: (props) => `solid 1px ${props.borderColor}`,
    borderLeft: (props) => (!props.isFirst && 'none !important'),
    width: (props) => `calc(${Math.max(1, props.width)}% - 1px)`,
    backgroundColor: (props) => props.color,
    borderTopLeftRadius: (props) => (props.isFirst ? 3 : 0),
    borderBottomLeftRadius: (props) => (props.isFirst ? 3 : 0),
    borderTopRightRadius: (props) => (props.isLast ? 3 : 0),
    borderBottomRightRadius: (props) => (props.isLast ? 3 : 0),
  },
}));
