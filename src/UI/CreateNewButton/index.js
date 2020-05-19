import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import useStyles from './styles';

const CreateNewButton = ({
  i18n,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.container}
      {...rest}
    >
      <Typography className={classes.text}>
        {i18n.buttonText}
      </Typography>
      <div className={classes.plusContainer}>
        <FontAwesomeIcon
          icon={faPlus}
        />
      </div>
    </Button>
  );
};

CreateNewButton.propTypes = {
  i18n: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateNewButton;
