import React from 'react';
import PropTypes from 'prop-types';

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
  </>
);

ThirdPartyAuth.propTypes = {
  onEthClick: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
  onTwitterClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Sign In', 'Sign Up']).isRequired,
};

export default ThirdPartyAuth;
