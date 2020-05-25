import React from 'react';

const NonAuthorizedWrapper = ({ children }) => {
  return (
    <>
      background and logo for singup/signin views + check if user isn't authorized, didn't setup app config
      <br />
      {children}
    </>
  );
};

export default NonAuthorizedWrapper;
