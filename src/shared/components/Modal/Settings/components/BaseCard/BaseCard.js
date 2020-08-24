import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './styles';

const BaseCard = ({ children, className }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      {children}
    </div>
  );
};

BaseCard.defaultProps = {
  children: null,
  className: '',
};

BaseCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default BaseCard;
