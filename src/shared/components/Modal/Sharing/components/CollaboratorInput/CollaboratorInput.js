import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import { faUser } from '@fortawesome/pro-light-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './styles';

const CollaboratorInput = (props) => {
  const {
    imageSrc,
    mainText,
    secondaryText,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>
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
      <Typography
        title={secondaryText}
        variant="body2"
      >
        {mainText}
      </Typography>
    </div>
  );
};

CollaboratorInput.defaultProps = {
  imageSrc: null,
  mainText: null,
  secondaryText: null,
};

CollaboratorInput.propTypes = {
  imageSrc: PropTypes.string,
  mainText: PropTypes.string,
  secondaryText: PropTypes.string,
};

export default CollaboratorInput;
