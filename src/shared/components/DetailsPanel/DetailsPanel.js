import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const DetailsPanel = ({ id, children }) => {
  const classes = useStyles();

  return (
    <div
      id={id}
      className={classes.root}
    >
      {children}
    </div>
  );
};

DetailsPanel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DetailsPanel;
