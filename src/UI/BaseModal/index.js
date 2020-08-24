import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import classnames from 'classnames';

import useStyles, { backdropStyles } from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const BaseModal = ({
  children,
  maxWidth,
  onClose,
  modalProps,
  paperProps,
}) => {
  const classes = useStyles({
    maxWidth,
  });

  const {
    className: paperClassName,
    ...paperRestProps
  } = paperProps;

  return (
    <Modal
      open
      onClose={onClose}
      disableAutoFocus
      BackdropProps={{ style: backdropStyles }}
      {...modalProps}
    >
      <Paper
        className={classnames(
          classes.paper,
          paperClassName,
        )}
        {...paperRestProps}
      >
        {children}
      </Paper>
    </Modal>
  );
};

BaseModal.defaultProps = {
  maxWidth: 'initial',
  modalProps: {},
  paperProps: {
    className: null,
  },
};

BaseModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  modalProps: PropTypes.shape({}),
  paperProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default BaseModal;
