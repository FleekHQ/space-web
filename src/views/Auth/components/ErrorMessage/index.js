import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import Box from '@material-ui/core/Box';

const ErrorMessage = ({ message }) => (
  <Box
    pl="10px"
    pr="14px"
    bottom={0}
    border={1}
    height={33}
    display="flex"
    color="#EF6A6E"
    borderRadius={4}
    bgcolor="#240F10"
    alignSelf="center"
    position="absolute"
    alignItems="center"
    borderColor="#EF6A6E"
  >
    <FontAwesomeIcon icon={faExclamationTriangle} />
    <Box ml="7px" component="span" color="common.white">
      {message}
    </Box>
  </Box>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
