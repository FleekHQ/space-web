import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    width: (props) => props.fixedWidth || '100%',
  },
});
