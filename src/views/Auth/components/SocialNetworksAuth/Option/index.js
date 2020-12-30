import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const ThirdPartyAuthOption = ({
  text,
  icon,
  disabled,
  onClick,
}) => {
  const classes = useStyles({ disabled });

  return (
    <Box
      mb="23px"
      height={36}
      tabIndex="0"
      width="100%"
      role="button"
      padding="1px"
      borderRadius={3}
      aria-pressed="false"
      className={classes.rainbow}
      onClick={onClick}
    >
      <Box bgcolor="#202020" height="100%" borderRadius={3}>
        <Box
          pl="12px"
          display="flex"
          height="inherit"
          alignItems="center"
          className="rainbow-bg"
          borderRadius={3}
        >
          <Box
            mr="11px"
            width={20}
            height={20}
            display="flex"
            position="relative"
            alignItems="center"
            color="common.white"
            justifyContent="center"
            className={classes.iconContainer}
          >
            {icon}
          </Box>
          <Typography>
            <Box component="span" color={disabled ? '#616161' : 'common.white'} fontSize="14px">
              {text}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

ThirdPartyAuthOption.defaultProps = {
  disabled: false,
};

ThirdPartyAuthOption.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ThirdPartyAuthOption;
