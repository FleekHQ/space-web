import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: (props) => props.fixedWidth || '100%'
  },
}));
