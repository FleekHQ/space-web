import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@ui/Typography';
import { getShortAddress } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';

import useStyles from './styles';

const Collaborator = (props) => {
  const {
    mainText,
    imageSrc,
    secondaryText,
    onSelect,
    address,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={onSelect} aria-hidden="true">
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
            {mainText || getShortAddress(address)}
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
  onSelect: () => null,
  address: null,
};

Collaborator.propTypes = {
  imageSrc: PropTypes.string,
  mainText: PropTypes.string,
  secondaryText: PropTypes.string,
  onSelect: PropTypes.func,
  address: PropTypes.string,
};

export default Collaborator;
