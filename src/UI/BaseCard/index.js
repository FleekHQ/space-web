import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './styles';

const BaseCard = ({ className, padding, children }) => {
  const classes = useStyles({ padding });

  return (
    <div className={classnames(classes.root, className)}>
      {children}
    </div>
  );
};

BaseCard.defaultProps = {
  className: undefined,
  padding: undefined,
  children: null,
};

BaseCard.propTypes = {
  className: PropTypes.string,
  padding: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  children: PropTypes.node,
};

export default BaseCard;
