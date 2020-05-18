import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const getFontWeight = (weight) => (
  `fontWeight${weight.charAt(0).toUpperCase()}${weight.substring(1)}`
)

const FleekTypography = ({ weight, color, children, ...restProps }) => {
  const typographyColor = color === 'accent' ? 'textSecondary' : color;

  return (
    <Typography
      color={typographyColor}
      children={weight
        ? <Box fontWeight={getFontWeight(weight)} component="span">{children}</Box>
        : children}
      {...restProps}
    />
  );
};

FleekTypography.defaultProps = {
  weight: undefined,
  color: 'primary',
  children: null,
};

FleekTypography.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'error']),
  weight: PropTypes.oneOf(['medium']),
  children: PropTypes.node,
};

export default FleekTypography;
