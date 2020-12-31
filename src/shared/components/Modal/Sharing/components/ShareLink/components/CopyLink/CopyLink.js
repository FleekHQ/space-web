import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import useStyles from './styles';

const CopyLink = ({ url, onClick, buttonText }) => {
  const classes = useStyles();

  const handleOnClick = (e) => {
    copy(url);
    onClick(e);
  };

  return (
    <div className={classes.root}>
      <OutlinedInput
        value={url}
        variant="outlined"
        className={classes.input}
      />
      <Button
        color="primary"
        onClick={handleOnClick}
        className={classes.button}
      >
        <Box fontWeight={500}>
          {buttonText}
        </Box>
      </Button>
    </div>
  );
};

CopyLink.defaultProps = {
  url: null,
};

CopyLink.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CopyLink;
