import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const BaseCard = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

BaseCard.defaultProps = {
  children: null,
};

BaseCard.propTypes = {
  children: PropTypes.node,
};

export default BaseCard;
