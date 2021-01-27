import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';

import useStyles from './styles';

const Collaborator = (props) => {
  const {
    mainText,
    imageSrc,
    secondaryText,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="User avatar"
            className={classes.image}
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className={classes.icon}
          />
        )}
      </div>
      <div>
        <Typography
          title={mainText}
          variant="body2"
        >
          <Box
            component="span"
            fontSize={14}
            fontWeight={500}
          >
            {mainText}
          </Box>
        </Typography>
        {secondaryText && (
        <Typography
          variant="body2"
        >
          <Box color="#808080" component="span">
            {secondaryText}
          </Box>
        </Typography>
        )}
      </div>
    </div>
  );
};

Collaborator.defaultProps = {
  imageSrc: null,
  mainText: null,
  secondaryText: null,
};

Collaborator.propTypes = {
  imageSrc: PropTypes.string,
  mainText: PropTypes.string,
  secondaryText: PropTypes.string,
};

export default Collaborator;
