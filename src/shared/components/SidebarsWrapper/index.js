import React from 'react';

const SidebarsWrapper = ({ children }) => {
  return (
    <>
      Sidebar with navigation
      <br />
      {children}
      <br />
      Right panel, with files/folders details
      + check if user is authorized (already setup the app config)
    </>
  );
};

export default SidebarsWrapper;
