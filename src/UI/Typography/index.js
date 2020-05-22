import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const getFontWeight = (weight) => (
  `fontWeight${weight.charAt(0).toUpperCase()}${weight.substring(1)}`
)

const FleekTypography = ({ weight, children, ...restProps }) => (
  <Typography
    children={weight
      ? <Box fontWeight={getFontWeight(weight)} component="span">{children}</Box>
      : children}
    {...restProps}
  />
);

FleekTypography.defaultProps = {
  weight: undefined,
  children: null,
};

FleekTypography.propTypes = {
  weight: PropTypes.oneOf(['medium']),
  children: PropTypes.node,
};

export default FleekTypography;
