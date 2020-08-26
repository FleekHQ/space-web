import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const getFontWeight = (weight) => (
  `fontWeight${weight.charAt(0).toUpperCase()}${weight.substring(1)}`
);

const FleekTypography = ({ weight, children, ...restProps }) => (
  <Typography
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
  >
    {
      weight ? <Box fontWeight={getFontWeight(weight)} component="span">{children}</Box> : children
    }
  </Typography>
);

FleekTypography.defaultProps = {
  weight: undefined,
  children: null,
};

FleekTypography.propTypes = {
  weight: PropTypes.oneOf(['medium', 'bold']),
  children: PropTypes.node,
};

export default FleekTypography;
