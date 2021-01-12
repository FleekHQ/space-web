import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './styles';

const DetailsPanel = ({
  id,
  children,
  className,
  viewMode,
}) => {
  const classes = useStyles({ viewMode });

  return (
    <div
      id={id}
      className={classnames(
        classes.root,
        className,
      )}
    >
      {children}
    </div>
  );
};

DetailsPanel.defaultProps = {
  className: null,
};

DetailsPanel.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  viewMode: PropTypes.string.isRequired,
};

export default DetailsPanel;
