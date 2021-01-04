import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';

import useStyles from './styles';
import { closeToast } from './actions';

const Toast = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, message } = useSelector((state) => state.toast);

  const messageNode = (
    <div className={classes.rootMessage}>
      <FontAwesomeIcon
        icon={faCheck}
      />
      <Typography variant="body1" color="inherit">
        {message}
      </Typography>
    </div>
  );

  return (
    <Snackbar
      open={open}
      message={messageNode}
      autoHideDuration={3000}
      onClose={() => dispatch(closeToast())}
      ContentProps={{
        classes: {
          root: classes.snackbarContent,
          message: classes.snackbarMessage,
        },
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
};

export default Toast;
