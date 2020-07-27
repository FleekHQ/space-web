import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import useStyles, { backdropStyles } from './styles';

const BaseModal = ({
  children,
  maxWidth,
  onClose,
  modalProps,
}) => {
  const classes = useStyles({
    maxWidth,
  });

  return (
    <Modal
      open
      onClose={onClose}
      disableAutoFocus
      BackdropProps={{ style: backdropStyles }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...modalProps}
    >
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Modal>
  );
};

BaseModal.defaultProps = {
  maxWidth: 'initial',
  modalProps: {},
};

BaseModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  modalProps: PropTypes.shape({}),
};

export default BaseModal;
