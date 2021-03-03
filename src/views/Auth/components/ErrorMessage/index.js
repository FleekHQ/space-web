import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

const ErrorMessage = ({ message, link }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <Box className={classes.contentBox} component="span">
        {message}
        {
          link !== undefined && (
            <Box component="span">
              <span>&#32;</span>
              <Link
                to={`/${link.to}`}
                className={classes.link}
              >
                {link.message}
              </Link>
            </Box>
          )
        }
      </Box>
    </Box>
  );
};

ErrorMessage.defaultProps = {
  link: undefined,
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  link: PropTypes.shape({
    to: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
