import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import Option from './Option';

const ThirdPartyAuth = ({
  type,
  onEthClick,
  onGoogleClick,
  onTwitterClick,
}) => (
  <>
    <Option
      type={type}
      text={`${type} with Google`}
      logoUrl={`${process.env.PUBLIC_URL}/assets/images/google.png`}
      onClick={onGoogleClick}
    />
    <Option
      text={`${type} with Twitter`}
      logoUrl={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
      onClick={onTwitterClick}
    />
    <Option
      disabled
      text={`${type} with Ethereum`}
      logoUrl={`${process.env.PUBLIC_URL}/assets/images/walletconnect.png`}
      onClick={onEthClick}
    />
    <Box mt="-15px" pl="17px" display="flex" alignItems="flex-end">
      <img height={37} src={`${process.env.PUBLIC_URL}/assets/images/curved-arrow.png`} alt="curved-arrow" />
      <Box
        ml="5px"
        top={10}
        fontSize={14}
        component="span"
        color="common.white"
        fontFamily="Kalam"
        position="relative"
      >
        Cooming soon!
      </Box>
    </Box>
  </>
);

ThirdPartyAuth.propTypes = {
  onEthClick: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
  onTwitterClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Sign In', 'Sign Up']).isRequired,
};

export default ThirdPartyAuth;
